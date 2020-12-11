
//引入包
const gulp = require('gulp')
const sass = require('gulp-sass')
const cssmin = require('gulp-cssmin')
const autoprefixer = require('gulp-autoprefixer')
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')
const htmlmin = require('gulp-htmlmin')
const del = require('del')
const webserver = require('gulp-webserver')
//gulp3
// gulp.task('sa',function(){
//   return gulp
//      .src('./src/*.scss')
//      .pipe(sass())//转码
//      .pipe(autoprefixer())//添加前缀
//      .pipe(cssmin())//压缩
//      .pipe(gulp.dest('./dist/'))//存放位置
// })

//gulp4

const sassHandler = function(){
    return gulp
        .src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cssmin())
        .pipe(gulp.dest('./dist/css/'))
}

//css
const cssHandler =function(){
    return gulp
    .src('./src/css/*.css')
    .pipe(autoprefixer())//
    .pipe(cssmin())
    .pipe(gulp.dest('./dist/css/'))
}

//js
const jsHandler =function(){
    return gulp
    .src('./src/js/*.js')
    .pipe(babel({presets:['@babel/env']}))//转码
    .pipe(uglify())//压缩
    .pipe(gulp.dest('./dist/js/'))//转存
}
//html
const htmlHandler = function(){
    return gulp
     .src('./src/html/*.html')
     .pipe(htmlmin({
         collapseWhitespace: true,//去除空白内容
         collapseBooleanAttributes : true,//简写布尔值属性
         removeAttributeQuotes:true,//去除属性双引号
         removeComments:true, //去除注释
         //removeEmptyElements:true, //去除空元素
         removeEmptyAttributes: true, //去除空属性
         removeScriptTypeAttributes:true,//去除script标签上的type属性
         removeStyleLinkTypeAttributes:true,//去除style标签上的type属性
         minifyCSS:true,
         minifyJS:true
     }))//压缩
     .pipe(gulp.dest('./dist/html/'))
}

//image
const imgHandler =function(){
    return gulp
    .src('./src/images/*.**')
    .pipe(gulp.dest('./dist/images/'))
}

//assets第三方
const assetsHandler = function(){
    return gulp
    .src('./src/assets/*/**')
    .pipe(gulp.dest('./dist/assets/'))
}
//删除项目文件
const delHandler = function(){
    return del('./dist/')
}
const webHandler =function(){
    return gulp.src('./dist/')
    .pipe(webserver({
        host:"www.netshop.com",
        port: 8080,
        open:'./html/index.html',
        livereload:true,
        proxies:[
            {
                source:'/gx',
                target:'http://localhost:80/test.php'
            }
        ]
    }))
}
const  watchHandler =()=>{
    gulp.watch('./src/html/*.html',htmlHandler)
    gulp.watch('./src/css/*.css',cssHandler)
    gulp.watch('./src/sass/*.sass',sassHandler)
    gulp.watch('./src/js/*.js',jsHandler)
}
//默认任务
const defaultHandler = gulp.series(
    delHandler,
    gulp.parallel(sassHandler,cssHandler,jsHandler,htmlHandler,assetsHandler,imgHandler),
    webHandler,
    watchHandler
)



module.exports.sassHandler = sassHandler
module.exports.cssHandler = cssHandler
module.exports.jsHandler = jsHandler
module.exports.htmlHandler = htmlHandler
module.exports.assetsHandler =assetsHandler
module.exports.delHandler = delHandler
module.exports.default = defaultHandler