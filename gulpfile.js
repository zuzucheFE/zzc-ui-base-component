/**
 * Created by lamho on 2017/5/6.
 */
let gulp = require( 'gulp' );
let path = require( 'path' );
let babel = require( "gulp-babel" );
let sass = require( 'gulp-sass' );
let through2 = require( 'through2' );

function transformJSStaticSCSSToCss() {
    return through2.obj( function ( file, encoding, cb ) {

        //如果文件为空，不做任何操作，转入下一个操作，即下一个pipe
        if ( file.isNull() ) {
            console.log( 'isNull' );
            this.push( file );
            return cb();
        }

        //插件不支持对stream直接操作，抛出异常
        if ( file.isStream() ) {
            console.log( 'isStream' );
            this.emit( 'error' );
            return cb();
        }

        const content = file.contents.toString( encoding );
        file.contents = new Buffer( content
            .replace( /\.jsx/g, '.js' )
            .replace( /\.scss/g, '.css' ) );

        //下面这两句基本是标配，可参考through2的API
        this.push( file );
        cb();
    } );
}

//打包
gulp.task( 'compile', ['scss', 'js', 'svg'], function () {

} );

//js
gulp.task( 'js', function () {
    gulp.src( ['./src/*.js', './src/**/*.js'] )
        .pipe( babel( {
            presets: ['es2015', 'react', 'stage-2']
        } ) )
        .pipe( transformJSStaticSCSSToCss() )
        .pipe( gulp.dest( 'dist' ) );
} );

//scss
gulp.task( 'scss', function () {
    gulp.src( './src/**/*.scss' )
        .pipe( sass() )
        .pipe( gulp.dest( 'dist' ) );
} );

//svg
gulp.task( 'svg', function () {
    gulp.src( './src/**/*.svg' )
        .pipe( gulp.dest( 'dist' ) );
} );

gulp.task( 'watch', function () {
    gulp.watch( ['./src/*.js', './src/**/*.js'], ['js'] );
    gulp.watch( './src/**/*.scss', ['scss'] );
    gulp.watch( './src/**/*.svg', ['svg'] );
} );

