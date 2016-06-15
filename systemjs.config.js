(function(global) {
  // map tells the System loader where to look for things
  var map = {
    'app':                        'app', // 'dist',
    'rxjs':                       'node_modules/rxjs',
    'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
    '@angular'                  : 'node_modules/@angular',    
    'ng2-ckeditor'              : 'node_modules/ng2-ckeditor/lib',
    'ng2-tabs'                  : 'node_modules/ng2-tabs',
    'ng2-bs3-modal'             : 'node_modules/ng2-bs3-modal',
    'primeng'                   : 'node_modules/primeng',
  };
  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'main.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'angular2-in-memory-web-api': { defaultExtension: 'js' },
    'ng2-ckeditor'              : { defaultExtension: 'js' },
    'ng2-tabs'                 : { main: 'index.js', defaultExtension: 'js' },
    'ng2-bs3-modal'          :{ defaultExtension: "js"},
    'primeng':                    { defaultExtension: 'js' }
  }; 
  var packageNames = [
    '@angular/common',
    '@angular/compiler',
    '@angular/core',
    '@angular/http',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    '@angular/router',
    '@angular/router-deprecated',
    '@angular/testing',
    '@angular/upgrade',
  ];
  // add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
  packageNames.forEach(function(pkgName) {
    packages[pkgName] = { main: 'index.js', defaultExtension: 'js' };
  });
  var config = {
    map: map,
    packages: packages
  }
  System.config(config);
})(this);
