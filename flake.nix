{
  description = "My Awesome Desktop Shell";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";

    ags = {
      url = "github:aylur/ags";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs =
    { self
    , nixpkgs
    , ags
    ,
    }:
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

        ]) ++
        # includes all Astal libraries
        (with ags.packages.${system};[
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
      );

      myShell = ags.lib.bundle {
        inherit pkgs;
        inherit extraPackages;
        src = ./.;
        name = "my-shell";
        entry = "app.ts";
      };


    in
    {
      packages.${system}.default = myShell;


      overlays.default = final: prev: {
        myShell = myShell;
      };

      devShells.${system} = {
        default = pkgs.mkShell {
          buildInputs = [
            # includes all Astal libraries
            ags.packages.${system}.agsFull
            pkgs.accountsservice
            pkgs.fzf
            pkgs.glib
            pkgs.libgtop
            pkgs.gnome-bluetooth

          ];
        };
      };
    };
}
