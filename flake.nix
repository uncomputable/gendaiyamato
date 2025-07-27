{
  description = "現代やまとことば辞典";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-25.05";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
  { self
  , nixpkgs
  , flake-utils
  , ...
  }:
  flake-utils.lib.eachDefaultSystem (system:
    let
      pkgs = nixpkgs.legacyPackages.${system};
      python3 = pkgs.python3.withPackages (p: with p; [
        mecab-python3
      ]);
    in
    {
      devShells = {
        default = pkgs.mkShell {
          buildInputs = [
            pkgs.just
            pkgs.nodejs
            pkgs.typescript
            python3
          ];
        };
      };
    }
  );
}
