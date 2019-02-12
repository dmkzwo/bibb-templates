<?php

$pageParam = $_GET['page'];

$pageContent = file_get_contents('patterns/pages/'.$pageParam.'.html');

$header = file_get_contents('includes/_00-head.mustache');
$footer = file_get_contents('includes/_01-foot.mustache');

$header = str_replace('../../', '', $header);
$footer = str_replace('../../', '', $footer);

$theme = 'bibb';
$pageTypeClass = '';

if (strpos($pageParam, 'theme') !== false) {
    $theme = 'theme1';
}
if (strpos($pageParam, '-fp') !== false) {
    $theme = 'theme1';
}
if (strpos($pageParam, 'deqavet') !== false) {
    $theme = 'theme-deqavet';
}
if (strpos($pageParam, 'foraus') !== false) {
    $theme = 'theme-foraus';
}
if (strpos($pageParam, 'homepage') !== false) {
    $pageTypeClass = 'homepage';
}

$header = str_replace(
        ['{{ htmlClass }}', '{{ bodyClass }}', '{{ pageTypeClass }}', '{{ cacheBuster }}', '{{ title }}', '{{{ patternLabHead }}}'],
        ['', $theme, $pageTypeClass, md5(time()), $pageParam, ''],
        $header
    );

$footer = str_replace(
    ['{{{ patternLabFoot }}}'],
    [''],
    $footer
);

echo $header;
echo $pageContent;
echo $footer;