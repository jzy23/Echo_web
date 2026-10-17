$ErrorActionPreference = "Stop"

$environmentFile = "C:\EchoSim\echosim.env.ps1"
if (-not (Test-Path -LiteralPath $environmentFile)) {
    throw "Missing production environment file: $environmentFile"
}

. $environmentFile

$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
$waitressExecutable = Join-Path $projectRoot ".venv\Scripts\waitress-serve.exe"

if (-not (Test-Path -LiteralPath $waitressExecutable)) {
    throw "Waitress is not installed: $waitressExecutable"
}

Set-Location $projectRoot
& $waitressExecutable --listen=127.0.0.1:8000 --threads=4 config.wsgi:application
exit $LASTEXITCODE
