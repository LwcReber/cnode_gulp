var gulp = require('gulp'); //本地安装gulp所用到的地方
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var eslint = require('gulp-eslint');

var cssmin = require('gulp-minify-css');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var autoreset = require('postcss-autoreset');
// var cssnext = require('postcss-cssnext');
var shortColor = require('postcss-short-color');
var shortcss = require('postcss-short');
var sass = require('gulp-sass');

var htmlmin = require('gulp-htmlmin');
var rev = require('gulp-rev-append');
var livereload = require('gulp-livereload');

var htmlOptions = {
    removeComments: true,   //清除HTML注释
    collapseWhitespace: true,   //压缩HTML
    collapseBooleanAttributes: true,  //省略布尔属性的值 <input checked="true"/> ==> <input />
    removeEmptyAttributes: true,  //删除所有空格作属性值 <input id="" /> ==> <input />
    removeScriptTypeAttributes: true,   //删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true,  //删除<style>和<link>的type="text/css"
    minifyJS: true,   //压缩页面JS
    minifyCSS: true   //压缩页面CSS
  };
var plugins = [
  shortcss,
  // cssnext,
  autoprefixer({browsers: ['> 1%'], cascade: false}),
  autoreset({
    reset: {
      margin: 0,
      padding: 0,
      borderRadius: 0,
      listStyle: 'none'
    }
  })
];


gulp.task('htmlmin', function() {
  gulp.src('./src/tpl/*.html')
    .pipe(htmlmin(htmlOptions))
    .pipe(gulp.dest('./dist/tpl'));
})


gulp.task('presass', function() {
  gulp.src('./src/styles/**/*.scss')
    .pipe(concat('index.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(plugins))
    .pipe(cssmin({
      //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
      advanced: false,
      //保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
      compatibility: 'ie7',
      //类型：Boolean 默认：false [是否保留换行]
      keepBreaks: true,
      //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
      keepSpecialComments: '*'
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(gulp.dest('./src')); // 用于 rev 使用

})

gulp.task('cssmin', function() {
  gulp.src('./src/styles/**/*.css')
    .pipe(concat('common.min.css'))
    .pipe(postcss(plugins))
    .pipe(cssmin({
      //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
      advanced: false,
      //保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
      compatibility: 'ie7',
      //类型：Boolean 默认：false [是否保留换行]
      keepBreaks: true,
      //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
      keepSpecialComments: '*'
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(gulp.dest('./src'));
    // .pipe(gulp.dest('./src/styles'))
})

gulp.task('lint', function() {
  gulp.src('./src/js/**/*.js')
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
})

gulp.task('jsmin', ['lint'], function() {
  gulp.src('./src/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015', 'stage-2']
    }))
    .pipe(concat('app.min.js'))
    .pipe(uglify({
        mangle: true,//类型：Boolean 默认：true 是否修改变量名
        compress: true,//类型：Boolean 默认：true 是否完全压缩
        // preserveComments: 'all' //保留所有注释
    }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest('./dist'))
    .pipe(gulp.dest('./src'));
})

gulp.task('revhtml', function() {
  gulp.src('./src/index.html')
    .pipe(rev())
    .pipe(htmlmin(htmlOptions))
    .pipe(gulp.dest('./dist'))
    .pipe(livereload());
})

gulp.task('copyLibs', function() {
  gulp.src('./src/libs/*')
    .pipe(gulp.dest('./dist/libs/'))
})

gulp.task('mywatch', ['copyLibs'], function() {
  livereload.listen();
  gulp.watch(['./src/js/**/*.js', './src/tpl/**/*.html', './src/styles/**/*.scss', './src/styles/**/*.css', './src/index.html'], ['jsmin', 'htmlmin', 'presass', 'cssmin', 'revhtml'], function(event){
    console.log(`${event.path} was ${event.type} , running tasks...`);
  })
})
