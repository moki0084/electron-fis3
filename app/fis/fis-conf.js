//global setting
//default dev setting
//project filter file
var buildPath = '';

process.argv.forEach((val, index) => {
    if (val == '-r') {
        buildPath = '/' + process.argv[++index];
    }
});

fis.set('project.ignore', [
    'node_modules/**',
    '.idea/**',
    'fis-conf.js',
    '**/*.md'

]);

fis.config.merge({
    settings: {
        optimizer: {
            'png-compressor': {
                type: 'pngquant'
            }
        },
        postprocessor: {
            autoprefixer: {
                "browsers": ["Android >= 2.3", "ChromeAndroid > 1%", "iOS >= 4", 'IE >=8', 'Firefox >= 20'],
                "cascade": false
            }
        }
    }
});

fis.set('date', new Date);

// fis.hook('node_modules', {
//     ignoreDevDependencies: true // 忽略 devDep 文件
// })

// 使用相对路径。
fis.hook('relative');
fis.match('**', {
    relative: true
}).match('**.min.**', {
    optimizer: null
}, true);




//sass
fis.match('**.scss', {
    rExt: '.css',
    parser: fis.plugin('node-sass', {
        sourceMapEmbed: true
    }),
    postprocessor: fis.plugin('autoprefixer')
}).match('(**/)sass(**.scss)', {
    rExt: '.css',
    release: '$1css$2'
}).match('(**/)sass(**.map)', {
    release: '$1css$2'
});

fis.match('*.css', {
    postprocessor: fis.plugin('autoprefixer')
});

//base64 img
//fis.match('**/base64/**', {
//    release: false,
//    useMap: false
//}, true);

fis.match('map.json', {
    release: false
});
fis.match('**.bat', {
    release: false
});

fis.match('_**/**', {
    release: false
}).match('_*.**', {
    release: false
});


//sprite
fis.config.set('settings.spriter.csssprites-group', {
    scale: 1,
    //rem: 50,
    margin: 10,
    layout: 'matrix',
    to: '../images/sprite'
});


//publish setting
fis.media('prod')
    //sass
    .match('*.scss', {
        parser: fis.plugin('node-sass', {
            outputStyle: 'compressed',
            //sourceMap: true
            sourceMapEmbed: false
        })
    }).match('*.css', {
        optimizer: fis.plugin('clean-css')
    })
    //
    //sprite
    // sprite 会对 CSS 中，路径带 ?__sprite 的图片进行合并
    // .match('::package', {
    //     spriter: fis.plugin('csssprites-group')
    // })
    // // 给匹配到的文件分配属性 `useSprite`
    // .match('*.{scss,css}', {
    //     useSprite: true
    // })
    //
    //images
    .match('*.png', {
        optimizer: fis.plugin('png-compressor')
    })
    //
    //js
    .match('*.js', {
        optimizer: fis.plugin('uglify-js')
    })
    //
    //json map
    .match('*.{js,css,jpg,png,gif,scss}', {
        useMap: true,
        query: '?t=' + (fis.get('date').getYear() + 1900) +
            (fis.get('date').getMonth() + 1) +
            (fis.get('date').getDate())
    }).match('map.json', {
        release: '/$0'
    })
    //
    //html
    .match('view/**', {
        release: false
    }).match('data/**', {
        release: false
    }).match('*', {
        // deploy: fis.plugin('local-deliver', {
        //     to: '../../../Public/record-wap' + buildPath
        // })
    });
//dist setting
fis.media('dist').match('map.json', {
    release: false
}).match('*', {
    // deploy: fis.plugin('local-deliver', {
    //     to: '../dist' + buildPath
    // })
});

//dev setting
fis.media('dev').match('map.json', {
    release: false
}).match('*', {
    // deploy: fis.plugin('local-deliver', {
    //     to: 'C:/Users/mama/AppData/Local/.fis3-tmp/www/record-wap' + buildPath
    // })
});

//fis3 release prod -d ../../pregnancy_stroage/Public/papi