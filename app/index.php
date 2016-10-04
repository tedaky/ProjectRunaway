<!DOCTYPE html>
<html>
<head>
    <?php require_once('head.php'); ?>
</head>
<body>
    <div class="col-xs-24">
        <div class="row">
            <div class="col-sm-12 col-lg-7">
                <p>Is this working? <?php echo("Maybe!"); ?></p>
            </div><div class="col-sm-12 push-sm-0 col-lg-15 push-lg-2">
                <p id="content"></p>
            </div>
        </div>
    </div>
    <!--build:js js/helloworld.min.js async -->
    <script src="javascript/typescript/helloworld.js"></script>
    <!-- endbuild -->
    <!--build:js js/raytracer.min.js async -->
    <script src="javascript/typescript/raytracer.js"></script>
    <!-- endbuild -->
</body>
</html>