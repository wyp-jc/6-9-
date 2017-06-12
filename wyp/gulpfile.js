var gulp      = require("gulp");
var uglify    = require("gulp-uglify");//js的压缩
var sass      = require("gulp-sass");//sass编译
var cleanCSS  = require("gulp-clean-css");//css的压缩
var imagemin  = require("gulp-imagemin");//图片的压缩
var tinypng   = require("gulp-tinypng");
var htmlmin   = require("gulp-htmlmin");//html压缩为一行
var webserver = require("gulp-webserver");//web服务热启动
var jshint    = require("gulp-jshint");//js校验
var concat    = require("gulp-concat"); //文件的合并
var browserify  = require("gulp-browserify");//模块化打包

var rev= require("gulp-rev"); //对文件名加上MD5后缀
var revCollector=require("gulp-rev-collector");//路径替换

// var livereload=require("gulp-livereload");//需要浏览器插件进行支持,
                                         //类似于node的livereload的插件

/*
*
*var minify-cc = require("gulp-minify-css");//css的压缩
*var rename = require("gulp-rename");//文件重命名
*
*/

//js压缩
gulp.task("jsmin",function(){

    gulp.src("src/js/*.js")
         //模块化打包 
        .pipe(browserify({
          insertGlobals : true,
          debug : !gulp.env.production
        }))
        // .pipe(uglify())
        .pipe(gulp.dest("bound/js")) 
})


//文件的合并
// gulp.task('testConcat', function () {
//     gulp.src('src/html/*.html')
//         .pipe(concat('all.html'))//合并后的文件名
//         .pipe(gulp.dest('dist/html'));
// });


//web服务热启动
gulp.task("webserver",["htmlmin","cssmin","jsmin"],function(){
    //利用watch进行监听，可以热启动---页面的自动刷新
    gulp.watch("./src/html/*.html",["htmlmin"])
    gulp.watch("./src/css/*.css",["cssmin"])
    gulp.watch("./src/js/*.js",["jsmin"])

    gulp.src("./bound")
    
        .pipe(webserver({
            livereload:true,//保存自动刷新页面
            // port:9999,//设置端口号
            middleware:function(req,res,next){
               console.log(req.url)
               var datas={
                 name:"wyp-jc"
               } 
               res.writeHead(200,{
                "Content-type":"application/json;charset=UTF-8",
                "Access-Control-Allow-Origin":"*"
               })
               res.write(JSON.stringify(datas));
               res.end();
            },
            directoryListening:true,//显示在页面中的时候自动以目录的形式
            open:"/html/index.html"
        }))
})


var paths = {
  scripts: 'src/js/**/*.js',
};
gulp.task('lint', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task("htmlmin",function(){
	gulp.src("src/html/*.html")
        .pipe( htmlmin({collapseWhitespace:true}) )
        .pipe(gulp.dest("bound/html"))

})


gulp.task("cssmin",function(){
	gulp.src("src/css/*.css")
        .pipe(cleanCSS())
        .pipe(gulp.dest("bound/css")) 
})


gulp.task("sass",function(){
	gulp.src("src/css/*.sass")
        .pipe(sass())
        .pipe(gulp.dest("bound/css")) 
})

gulp.task("sass",function(){
	gulp.src("src/css/*.sass")
        .pipe(sass())
        .pipe(gulp.dest("bound/css")) 
})




gulp.task("imgmin",function(){
	gulp.src("src/img/2.JPG")
        .pipe(imagemin())
        .pipe(gulp.dest("bound/img")) 
})

gulp.task("tinypng",function(){
	gulp.src("src/img/1.png")
        .pipe(imagemin())
        .pipe(gulp.dest("bound/img")) 
})

