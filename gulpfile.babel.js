import yargs from 'yargs';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import {setup as emittySetup} from 'emitty';
import routerConfig from './router-config';

let argv = yargs.default({
	base: '.',
	browser: null,
	cache: true,
	compress: true,
	debug: true,
	exclude: [],
	fix: false,
	htmlExt: true,
	include: [],
	notify: true,
	only: [],
	name: null,
	open: true,
	port: 3000,
	production: false,
	spa: false,
	sourcemaps: true,
	throwErrors: false,
	time: true,
}).argv;

function arg2array(arg, separator = ',') {
	return Array.isArray(arg) ? arg : (arg || '').split(separator);
}

let $ = gulpLoadPlugins({
	overridePattern: false,
	pattern: [
		'browser-sync',
		'connect-history-api-fallback',
		'cssnano',
		'merge-stream',
		'postcss-reporter',
		'postcss-scss',
		'stylelint',
		'vinyl-buffer',
	],
	scope: [
		'dependencies',
		'devDependencies',
		'optionalDependencies',
		'peerDependencies',
	],
});

let errorHandler;

if (argv.throwErrors) {
	errorHandler = false;
} else {
	errorHandler = argv.notify ? $.notify.onError('<%= error.message %>') : null;
}

let emittyPug = emittySetup('src', 'pug', {
	makeVinylFile: true,
});

export function copy() {
	return gulp.src([
		'src/resources/**/*.*',
		'src/resources/**/.*',
	], {
		allowEmpty: true,
		base: 'src/resources',
		dot: true,
		since: gulp.lastRun('copy'),
	})
		.pipe($.if(argv.cache, $.newer('build')))
		.pipe($.if(argv.debug, $.debug()))
		.pipe(gulp.dest('build'));
}

export function images() {
	return gulp.src('src/images/**/*.*', {
		sins: gulp.lastRun('images'),
	})
		.pipe($.plumber({
			errorHandler,
		}))
		.pipe($.if(argv.cache, $.newer('build/images')))
		.pipe($.if(argv.debug, $.debug()))
		.pipe($.imagemin([
			$.imagemin.gifsicle({
				interlaced: true,
			}),
			$.imagemin.jpegtran({
				progressive: true,
			}),
			$.imagemin.optipng({
				optimizationLevel: 3,
			}),
			$.imagemin.svgo(),
		]))
		.pipe(gulp.dest('build/images'));
}

export function pngSprites() {
	const spritesData = gulp.src('src/images/sprites/png/*.png')
		.pipe($.plumber({
			errorHandler,
		}))
		.pipe($.if(argv.debug, $.debug()))
		.pipe($.spritesmith({
			cssName: '_sprites.scss',
			cssTemplate: 'src/scss/_sprites.hbs',
			imgName: 'sprites.png',
			retinaImgName: 'sprites@2x.png',
			retinaSrcFilter: 'src/images/sprites/png/*@2x.png',
			padding: 2,
		}));

	return $.mergeStream(
		spritesData.img
			.pipe($.plumber({
				errorHandler,
			}))
			.pipe($.vinylBuffer())
			.pipe($.imagemin())
			.pipe(gulp.dest('build/images')),
		spritesData.css
			.pipe(gulp.dest('src/scss'))
	);
}

export function svgSprites() {
	return gulp.src('src/images/sprites/svg/*.svg')
		.pipe($.plumber({
			errorHandler,
		}))
		.pipe($.if(argv.debug, $.debug()))
		.pipe($.svgmin({
			js2svg: {
				pretty: !argv.production,
			},
			plugins: [
				{
					cleanupIDs: false,
				},
			],
		}))
		.pipe($.svgstore())
		.pipe($.if(!argv.production, $.replace('?><!', '?>\n<!')))
		.pipe($.if(!argv.production, $.replace('><svg', '>\n<svg')))
		.pipe($.if(!argv.production, $.replace('><symbol', '>\n<symbol')))
		.pipe($.if(!argv.production, $.replace('></svg', '>\n</svg')))
		.pipe($.rename('sprites.svg'))
		.pipe(gulp.dest('build/images'));
}

export function jsMain() {
	return gulp.src('src/js/main.js')
		.pipe($.plumber({
			errorHandler,
		}))
		.pipe($.if(argv.debug, $.debug()))
		.pipe($.fileInclude({
			prefix: '// @',
		}))
		.pipe($.babel({
			presets: [
				'es2015',
			],
		}))
		.pipe($.if(argv.production, $.stripDebug()))
		.pipe($.jsbeautifier({
			js: {
				indent_with_tabs: true,
				end_with_newline: true,
				max_preserve_newlines: 2,
			},
		}))
		.pipe(gulp.dest('build/js'));
}

export function jsVendor() {
	return gulp.src('src/js/vendor.js', {
		since: gulp.lastRun('jsVendor'),
	})
		.pipe($.plumber({
			errorHandler,
		}))
		.pipe($.if(argv.debug, $.debug()))
		.pipe($.if(argv.cache, $.newer('build/js')))
		.pipe($.fileInclude({
			prefix: '// @',
		}))
		.pipe($.if(argv.production, $.uglify()))
		.pipe(gulp.dest('build/js'));
}

export function pug() {
	if (!argv.cache) {
		return gulp.src('src/*.pug')
			.pipe($.plumber({
				errorHandler,
			}))
			.pipe($.if(argv.debug, $.debug()))
			.pipe($.pug({
				pretty: true,
			}))
			.pipe(gulp.dest('build'));
	}

	return new Promise((resolve, reject) => {
		emittyPug.scan(global.emittyPugChangedFile).then(() => {
			gulp.src('src/*.pug')
				.pipe($.plumber({
					errorHandler,
				}))
				.pipe(emittyPug.filter(global.emittyPugChangedFile))
				.pipe($.if(argv.debug, $.debug()))
				.pipe($.pug({
					pretty: true,
				}))
				.pipe(gulp.dest('build'))
				.on('end', resolve)
				.on('error', reject);
		});
	});
}

export function scss() {
	return gulp.src([
		'src/scss/*.scss',
		'!src/scss/_*.scss',
	])
		.pipe($.plumber({
			errorHandler,
		}))
		.pipe($.if(argv.debug, $.debug()))
		.pipe($.if(argv.sourcemaps, $.sourcemaps.init()))
		.pipe($.sass().on('error', $.sass.logError))
		.pipe($.postcss([
			$.cssnano({
				autoprefixer: {
					add: true,
					browsers: ['> 0%'],
				},
				calc: true,
				discardComments: {
					removeAll: true,
				},
				zindex: false,
			}),
		]))
		.pipe($.if(argv.sourcemaps, $.sourcemaps.write('.')))
		.pipe(gulp.dest('build/css'));
}

export function lintJs() {
	return gulp.src([
		'*.js',
		'src/js/**/*.js',
		'!src/js/vendor/**/*.js',
	], {
		base: '.',
	})
		.pipe($.plumber({
			errorHandler,
		}))
		.pipe($.eslint({
			fix: argv.fix,
		}))
		.pipe($.eslint.format())
		.pipe($.if((file) => file.eslint && file.eslint.fixed, gulp.dest('.')));
}

export function lintPug() {
	return gulp.src([
		'src/*.pug',
		'src/pug/**/*.pug',
	])
		.pipe($.plumber({
			errorHandler,
		}))
		.pipe($.pugLinter())
		.pipe($.pugLinter.reporter(argv.throwErrors ? 'fail' : null));
}

export function lintScss() {
	return gulp.src([
		'src/scss/**/*.scss',
		'!src/scss/vendor/**/*.scss',
	])
		.pipe($.plumber({
			errorHandler,
		}))
		.pipe($.postcss([
			$.stylelint(),
			$.postcssReporter({
				clearReportedMessages: true,
				throwError: argv.throwErrors,
			}),
		], {
			parser: $.postcssScss,
		}));
}

export function watch() {
	gulp.watch([
		'src/resources/**/*.*',
		'src/resources/**/.*',
	], copy);

	gulp.watch('src/images/**/*.*', images);

	gulp.watch('src/images/sprites/svg/*.svg', svgSprites);

	gulp.watch([
		'src/images/sprites/png/*.png',
		'src/scss/_sprites.hbs',
	], pngSprites);

	gulp.watch([
		'src/js/**/*.js',
		'!src/js/vendor.js',
	], jsMain);

	gulp.watch('src/js/vendor.js', jsVendor);

	gulp.watch([
		'src/*.pug',
		'src/pug/**/*.pug',
	], {
		delay: 0,
	}, pug)
		.on('all', (event, file) => {
			if (event === 'unlink') {
				global.emittyPugChangedFile = undefined;
			} else {
				global.emittyPugChangedFile = file;
			}
		});

	gulp.watch('src/scss/**/*.scss', scss);
}

export function serve() {
	let middleware = [];

	if (argv.spa) {
		middleware.push($.connectHistoryApiFallback(routerConfig));
	}

	$.browserSync
		.create()
		.init({
			browser: arg2array(argv.browser),
			notify: false,
			open: argv.open,
			port: argv.port,
			files: [
				'./build/**/*',
			],
			server: {
				baseDir: './build',
				middleware,
				serveStaticOptions: {
					extensions: argv.htmlExt ? [] : ['html'],
				},
			},
		});
}

export function zip() {
	// eslint-disable-next-line global-require
	let name = argv.name ? argv.name : require('./package.json').name;

	if (argv.time) {
		let now = new Date();
		let year = now.getFullYear();
		let month = now.getMonth() + 1;
		let day = now.getDate();
		let hours = now.getHours();
		let minutes = now.getMinutes();

		month = month < 10 ? `0${month}` : month;
		day = day < 10 ? `0${day}` : day;
		hours = hours < 10 ? `0${hours}` : hours;
		minutes = minutes < 10 ? `0${minutes}` : minutes;

		name += `_${year}-${month}-${day}_${hours}-${minutes}`;
	}

	let files = [
		'build/**',
		'src/**',
		'.babelrc',
		'.gitignore',
		'.npmrc',
		'*.js',
		'*.json',
		'*.md',
		'*.yml',
		'!zip/**',
	];

	let includeFiles = arg2array(argv.include);
	let excludeFiles = arg2array(argv.exclude);
	let onlyFiles = arg2array(argv.only);

	if (argv.include.length) {
		files = files.concat(includeFiles);
	}

	if (argv.exclude.length) {
		excludeFiles = excludeFiles.map((excludedFile) => {
			if (files.includes(excludedFile)) {
				files = files.filter((file) => file !== excludedFile);
			}

			return `!${excludedFile}`;
		});

		files = files.concat(excludeFiles);
	}

	if (argv.only.length) {
		files = onlyFiles;
	}

	return gulp.src(files, {
		allowEmpty: true,
		base: argv.base,
		dot: true,
	})
		.pipe($.zip(`${name}.zip`, {
			compress: argv.compress,
		}))
		.pipe(gulp.dest('zip'));
}

export const build = gulp.parallel(
	copy,
	images,
	svgSprites,
	pngSprites,
	jsMain,
	jsVendor,
	pug,
	scss
);

export const lint = gulp.series(
	lintJs,
	lintPug,
	lintScss
);

export default gulp.series(
	build,
	gulp.parallel(
		watch,
		serve
	)
);
