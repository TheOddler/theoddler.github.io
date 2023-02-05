with (import <nixpkgs> {});

mkShell {
  buildInputs = [
    bundler

    # Requirements for pdf generation:
    pandoc
    wkhtmltopdf-bin
  ];

  shellHook = ''
    alias install='bundle install'
    alias update='bundler update'
    alias dev='bundle exec jekyll serve --watch --livereload'
    alias serve=dev
  '';
}
