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
fis.match('**.{sass,scss}', {
  rExt: '.css',
  parser: fis.plugin('sass-by-ruby', {
  }),
  postprocessor: fis.plugin('autoprefixer')
}).match('(**/){sass,scss}(**.{sass,scss})', {
  rExt: '.css',
  release: '$1css$2'
});

fis.match('*.css', {
  postprocessor: fis.plugin('autoprefixer')
})

// 编译less
fis.match('*.less', {
  parser: fis.plugin('less-2.x'),
  rExt: '.css',
  postprocessor: fis.plugin('autoprefixer')
}).match('(**/)less(**.less)', {
  rExt: '.css',
  release: '$1css$2'
});

//js
fis.set('project.fileType.text', 'es');

fis.match('*.{es,js,es6}', {
  parser: fis.plugin('babel-6.x', {
    sourceMaps: true
  }),
  rExt: 'js'
});

fis.match('*.{js,es,es6}', {
  preprocessor: [
    fis.plugin('js-require-file'),
    fis.plugin('js-require-css')
  ]
});

fis.match('module/**.js', {
  isMod: true
});
fis.hook('commonjs');

//过滤文件
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
  .match('*.{css,less,sass,scss}', {
    optimizer: fis.plugin('clean-css')
  })
  //
  // sprite
  // sprite 会对 CSS 中，路径带 ?__sprite 的图片进行合并
  .match('::package', {
    spriter: fis.plugin('csssprites-group')
  })
  // 给匹配到的文件分配属性 `useSprite`
  .match('*.{scss,css}', {
    useSprite: true
  })
  //images
  .match('*.png', {
    optimizer: fis.plugin('png-compressor')
  })
  //js
  .match('*.js', {
    optimizer: fis.plugin('uglify-js')
  })
  //json map
  .match('*.{js,css,jpg,png,gif,scss}', {
    useMap: true,
    query: '?t=' + (fis.get('date').getYear() + 1900) +
      (fis.get('date').getMonth() + 1) +
      (fis.get('date').getDate())
  }).match('map.json', {
    release: '/$0'
  })
  .match('**/{mock}/**', {
    release: false
  });

//static setting
fis.media('static')
  //sass
  .match('*.{css,less,sass,scss}', {
    optimizer: fis.plugin('clean-css')
  })
  //
  // sprite
  // sprite 会对 CSS 中，路径带 ?__sprite 的图片进行合并
  .match('::package', {
    spriter: fis.plugin('csssprites-group')
  })
  // 给匹配到的文件分配属性 `useSprite`
  .match('*.{scss,css}', {
    useSprite: true
  })
  //images
  .match('*.png', {
    optimizer: fis.plugin('png-compressor')
  })
  //js
  .match('*.js', {
    optimizer: fis.plugin('uglify-js')
  })
  //json map
  .match('*.{js,css,jpg,png,gif,scss}', {
    useMap: true,
    query: '?t=' + (fis.get('date').getYear() + 1900) +
      (fis.get('date').getMonth() + 1) +
      (fis.get('date').getDate())
  }).match('map.json', {
    release: '/$0'
  })
  .match('**/{mock,view}/**', {
    release: false
  });



//dist setting
fis.media('dist').match('map.json', {
  release: false
});

//dev setting
fis.media('dev').match('map.json', {
  release: false
}).match('*', {
  deploy: fis.plugin('local-deliver', {
    to: fis.project.getTempPath('www')
  })
});
