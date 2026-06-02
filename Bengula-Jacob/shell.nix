{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs_20
    pkgs.git
  ];

  shellHook = ''
    echo "========================================================"
    echo "⚡ BENGULA INC PORTAL DEVELOPMENT ENVIRONMENT (NixOS) ⚡"
    echo "========================================================"
    echo "Node.js Version: $(node --version)"
    echo "NPM Version:    $(npm --version)"
    echo ""
    echo "Commands:"
    echo "  - npm install  : Install dependencies"
    echo "  - npm run dev  : Run the local dev server on http://localhost:3000"
    echo "  - npm run lint : Run the TypeScript compiler & linter"
    echo "  - npm run build: Test production static compilation"
    echo "========================================================"
  '';
}
