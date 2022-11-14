with (import <nixpkgs> {});

mkShell {
  buildInputs = [
    bundler
  ];

  shellHook = ''
    alias install='bundle install'
    alias dev='bundle exec jekyll serve'
    alias serve=dev
  '';
}
