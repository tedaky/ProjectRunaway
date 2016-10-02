<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Index</title>
    <!-- build:css css/styles.min.css -->
    <link rel="stylesheet" href="css/scss/grid/grid.css">
    <link rel="stylesheet" href="css/scss/align_float/align_float.css">
    <!-- endbuild -->
    <!-- build:css css/styles-xs.min.css media="(min-width: 1em)" -->
    <link rel="stylesheet" href="css/scss/grid/grid-xs.css" media="(min-width: 1em)">
    <link rel="stylesheet" href="css/scss/align_float/align_float-xs.css" media="(min-width: 1em)">
    <!-- endbuild -->
    <!-- build:css css/styles-sm.min.css media="(min-width: 34em)" -->
    <link rel="stylesheet" href="css/scss/grid/grid-sm.css" media="(min-width: 34em)">
    <link rel="stylesheet" href="css/scss/align_float/align_float-sm.css" media="(min-width: 34em)">
    <!-- endbuild -->
    <!-- build:css css/styles-md.min.css media="(min-width: 48em)" -->
    <link rel="stylesheet" href="css/scss/grid/grid-md.css" media="(min-width: 48em)">
    <link rel="stylesheet" href="css/scss/align_float/align_float-md.css" media="(min-width: 48em)">
    <!-- endbuild -->
    <!-- build:css css/styles-lg.min.css media="(min-width: 62em)" -->
    <link rel="stylesheet" href="css/scss/grid/grid-lg.css" media="(min-width: 62em)">
    <link rel="stylesheet" href="css/scss/align_float/align_float-lg.css" media="(min-width: 62em)">
    <!-- endbuild -->
</head>
<body>
    <div class="row"><?php
        ?><div class="col-sm-12 col-lg-8">
            <p>Is this working? <?php echo("Maybe!"); ?></p>
        </div><?php
        ?><div class="col-sm-12 col-lg-16">
            <p id="content"></p>
        </div><?php
    ?></div>
    <!--build:js js/main.min.js -->
    <script src="javascript/typescript/helloworld.js"></script>
    <script src="javascript/typescript/raytracer.js"></script>
    <!-- endbuild -->
</body>
</html>