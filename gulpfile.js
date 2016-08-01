var gulp = require('gulp'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    minifycss = require('gulp-minify-css'),
    gulpCopy = require('gulp-file-copy'),
    del = require('del');

gulp.task('clean', function(cb) {
    del(['./dist/NPMap3D.min.js', './dist/*.css'], cb);
});

gulp.task('minifyjs', function() {
    return gulp.src(['Source/lib/Cesium.js', 'Source/lib/viewerCesiumNavigationMixin.min.js',
            'Source/Init.js', 'Source/Util.js', 'Source/lib/ThirdParty/DrawHelper/DrawHelper.js',
            'Source/Layer/*.js', 'Source/Layer/*.js',
            'Source/NPMap3D.js',
            'Source/Overlay.js', 'Source/Color.js', 'Source/Material.js',
            'Source/Material/*.js', 'Source/Overlay/*.js'
        ])
        .pipe(concat('NPMap3D.js'))
        .pipe(rename('NPMap3D.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/'));
});

gulp.task('minifycss', function() {
    return gulp.src(['Source/lib/Widgets/shared.css',
            'Source/lib/Widgets/Animation/Animation.css',
            'Source/lib/Widgets/BaseLayerPicker/BaseLayerPicker.css',
            'Source/lib/Widgets/CesiumWidget/CesiumWidget.css',
            'Source/lib/Widgets/CesiumInspector/CesiumInspector.css',
            'Source/lib/Widgets/FullscreenButton/FullscreenButton.css',
            'Source/lib/Widgets/VRButton/VRButton.css',
            'Source/lib/Widgets/Geocoder/Geocoder.css',
            'Source/lib/Widgets/InfoBox/InfoBox.css',
            'Source/lib/Widgets/SceneModePicker/SceneModePicker.css',
            'Source/lib/Widgets/PerformanceWatchdog/PerformanceWatchdog.css',
            'Source/lib/Widgets/NavigationHelpButton/NavigationHelpButton.css',
            'Source/lib/Widgets/SelectionIndicator/SelectionIndicator.css',
            'Source/lib/Widgets/Timeline/Timeline.css',
            'Source/lib/Widgets/Viewer/Viewer.css',
            'Source/lib/ThirdParty/DrawHelper/DrawHelper.css'
        ])
        .pipe(concat('map.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('./dist'));
});

gulp.task('copy', function() {
    var start = 'Source/lib/Assets/*/*/*';
    gulp.src(start).pipe(gulp.dest('./dist/Assets'));     
    var start = 'Source/lib/Workers/*/*/*';
    return gulp.src(start).pipe(gulp.dest('./dist/Workers'));

});


gulp.task('default', ['clean', 'minifycss', 'minifyjs'], function() {
    // console.log('start')
    //gulp.start('minifyjs');

});
