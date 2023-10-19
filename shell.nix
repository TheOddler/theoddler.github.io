with (import <nixpkgs> { });

mkShell {
  buildInputs = [
    jekyll
    bundler
  ];

  shellHook = ''
    alias dev='jekyll serve --watch --livereload'
    alias serve=dev
  '';
}
