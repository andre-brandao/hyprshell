{
  description = "HyprShell";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";

    matcha.url = "git+https://codeberg.org/QuincePie/matcha"; # idle inhibitor
    matugen.url = "github:InioX/matugen?ref=v2.2.0"; # material theme generator
    ags = {
      url = "github:aylur/ags";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs =
    { self
    , nixpkgs
    , ags
    , ...
    }@inputs:
    let

      system = "x86_64-linux";
      pkgs = nixpkgs.legacyPackages.${system};

      extraPackages = (
        # extra packages
        (with pkgs; [
          accountsservice

          fzf
          glib
          libgtop
          gnome-bluetooth

        ])
        ++
        # includes all Astal libraries
        (with ags.packages.${system}; [
          battery
          hyprland
          notifd
          powerprofiles
          tray
          mpris
          network
          wireplumber
          apps
          io
          auth
          cava
          greet
        ])
        ++ ([
          inputs.matugen.packages.${system}.default
          inputs.matcha.packages.${system}.default
        ])
      );

      hyprshell = ags.lib.bundle {
        inherit pkgs;
        inherit extraPackages;
        src = ./.;
        name = "hyprshell";
        entry = "app.ts";
      };

    in
    {
      packages.${system} = {
        default = hyprshell;
      };
      devShells.${system}.default = pkgs.mkShell {
        buildInputs = [
          (pkgs.writeShellScriptBin "types" ''
            ags types --tsconfig
          '')
          (ags.packages.${system}.default.override {
            extraPackages = extraPackages ++ [
              # extra dev packages for development or testing (will be passed to ags)
            ];
          })
        ];
        shellHook = ''
          echo "Welcome to HyprShell dev environment!"
          echo "Use 'types' to generate local types for your project."
        '';
      };
    };
}
