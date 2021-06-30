<?php
return [
  'api' => [
    'auth' => 'https://slack.com/oauth/authorize?client_id=488703707634.885960862118&scope=search:read,channels:history,users:read,channels:read,groups:read,im:read,mpim:read&team=d-sslack.slack.com&redirect_uri=http://192.168.34.10/slack_dmp.php',
    'access' => 'https://slack.com/api/oauth.access?client_id=488703707634.885960862118&client_secret=ee0d17295f305e90109e45a78680ea8b',
    'user_list' => 'https://slack.com/api/users.list',
    'channel_list' => 'https://slack.com/api/conversations.list',
    'history' => 'https://slack.com/api/channels.history',
  ],
  'exclude_list' => [
    'prepaid-user',
    'prepaid-admin',
    'prepaid-sales-slip',
    'prepaid-authorization',
    'prepaid-system',
    'tomopay-authorization',
    'tomopay-development',
    'tomopay-batch',
    'tomopay-admin',
    'backlog_bizpreca_1',
    'backlog_bizpreca_2',
  ],
  'once' => 200,
  'output_path' => './out/',
];
?>
