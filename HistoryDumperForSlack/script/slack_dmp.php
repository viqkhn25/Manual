<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

require 'vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

date_default_timezone_set('Asia/Tokyo');

$conf = require_once 'slack_conf.php';

if(!isset($_GET['code']) && !isset($_GET['token'])){
  //authorize認証でcode取得
  header('Location: '.$conf['api']['auth']);
  exit;
}

//Oath2認証でtoken取得
$contents = @file_get_contents($conf['api']['access'].'&code='.$_GET['code']);
$res_arr = json_decode($contents, true);
$access_token = $res_arr['access_token'];
echo $access_token."<br/>";

//ユーザリスト取得
$contents = @file_get_contents($conf['api']['user_list'].'?token='.$access_token);
$res_arr = json_decode($contents, true);
$members = $res_arr['members'];
$user_list = [];
foreach ($members as $member){
  $user_list[$member['id']] =  strlen($member['profile']['display_name']) < 1 ? $member['real_name'] : $member['profile']['display_name'];
}

//チャンネル取得
$contents = @file_get_contents($conf['api']['channel_list'].'?token='.$access_token);
$res_arr = json_decode($contents, true);
$channels = $res_arr['channels'];
$channels_list = [];
foreach ($channels as $channel){
  $channels_list[$channel['id']] =  $channel['name'];
}
// echo var_export($channels_list, true);

mkdir($conf['output_path']);

$sheetindex = 0;
$spreadsheet = new Spreadsheet();
$spreadsheet->getProperties()->setCreator('Slack')
        ->setLastModifiedBy('Slack');

//チャンネルごとチャット履歴取得
foreach ($channels_list as $key => $val){

  $mem_msg_arr = [];
  if(in_array ($val, $conf['exclude_list']) || substr($val, 0, 5) === 'times'){
    continue;
  }

  // if($val !== 'app_general'){
  //   continue;
  // }

  try{
    $sheet = new \PhpOffice\PhpSpreadsheet\Worksheet\Worksheet($spreadsheet, $val);
    $sheet->getColumnDimension('A')->setAutoSize(true);
    $sheet->getColumnDimension('B')->setAutoSize(true);
    $sheet->getColumnDimension('C')->setWidth(120);

    $spreadsheet->addSheet($sheet, $sheetindex++);
    $i = 0;
    $latest = "";

    while (true) {
      $query_str = '?token='.$access_token;
      $query_str .= '&channel='.$key;
      $query_str .= '&count='.$conf['once'];
      if($i > 0){
        // $query_str .= '&inclusive=true';
        $query_str .= '&latest='.$latest;
      }else{
        $i++;
        // echo var_export($message,true);
        $sheet->setCellValue('A'.$i, 'Timestamp');
        $sheet->setCellValue('B'.$i, 'User');
        $sheet->setCellValue('C'.$i, 'Message');
      }
      $contents = @file_get_contents($conf['api']['history'].$query_str);
      $res_arr = json_decode($contents, true);
      $messages = $res_arr['messages'];
      if(count($messages) === 0){
        break;
      }
      foreach($messages as $message){
        $mem_msg_arr[$i++] = $message;
        $latest = $message['ts'];
      }
    }
    // 情報全量を日時昇順にする
    krsort($mem_msg_arr);
    // 値を書き出す
    $i = 1;
    foreach($mem_msg_arr as $index => $message){
      $i++;
      $text = $message['text'];
      $files = array_key_exists('files', $message) ? $message['files'] : [];
      preg_match_all('/<@[A-Z0-9]+>/',$text, $match);
      // echo var_export($match, true)."<br/>";
      foreach($match as $completeMatch){
        foreach ($completeMatch as $ref) {
          $uid = substr($ref,2,strlen($ref)-3);
          $uname = $user_list[$uid];
          if(isset($user_list[$uid])){
            $text = html_entity_decode(str_replace($ref, '@'.$uname, $text));
          }
        }
      }
      // 添付ファイル
      if(!empty($files)){
        $text .= "\n\n\n This message has attachments: \n";
        foreach($files as $file){
          if(array_key_exists('url_private_download',$file)){
            $text .= $file['url_private_download']."\n";
          }else{
            $text .= "Missing...(File may be deleted) \n";
          }
        }
      }

      $timestamp = date('Y-m-d H:i:s', substr($message['ts'],0,-7));
      $username = isset($message['user']) ? $user_list[$message['user']]: "";
      $txt_content = "($timestamp $username) \r\n $text \r\n\r\n";
      file_put_contents($conf['output_path'].$val.'.txt', $txt_content, FILE_APPEND);

      $sheet->setCellValue('A'.$i, $timestamp);
      $sheet->setCellValue('B'.$i, $username);
      $sheet->setCellValue('C'.$i, $text);
      $sheet->getStyle('A'.$i)->getAlignment()->setVertical(Alignment::VERTICAL_TOP);
      $sheet->getStyle('B'.$i)->getAlignment()->setVertical(Alignment::VERTICAL_TOP);
      $sheet->getStyle('C'.$i)->getAlignment()->setWrapText(true);
      $sheet->getRowDimension($i)->setRowHeight(-1);
    }
  }catch(Exception $e){
    echo $e.message;
  }
}
$spreadsheet->setActiveSheetIndex(0);
$writer = new Xlsx($spreadsheet);
$writer->setPreCalculateFormulas(false);
$writer->save("SlackHistory.xlsx");
