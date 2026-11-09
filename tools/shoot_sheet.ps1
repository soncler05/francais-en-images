param(
  [Parameter(Mandatory=$true)][string]$Tag
)

# Capture une planche de revue (tools/svg_sheet.py) en pleine hauteur.
# Le lecteur n'est pas en jeu ici : pas de lenteur d'images, donc une
# hauteur fixe de 1400 px conviendrait mal — les planches sont longues.
$edge   = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$outDir = Join-Path $PSScriptRoot "sheets"
$tmp    = "C:\Users\soncl\AppData\Local\Temp\opencode"
$src    = Join-Path $outDir "$Tag.html"
$dest   = Join-Path $outDir "$Tag.png"
$profile = Join-Path $tmp "edgeprof-sheet-$Tag"
$log     = Join-Path $tmp "edge-sheet-$Tag.log"

if (-not (Test-Path $src)) { Write-Error "manquant : $src"; exit 1 }
if (Test-Path $dest) { Remove-Item $dest -Force }

$args = @(
  "--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check",
  "--user-data-dir=$profile", "--hide-scrollbars", "--force-prefers-reduced-motion",
  "--window-size=1500,4200",
  "--screenshot=$dest",
  "--virtual-time-budget=8000",
  "file:///$($src -replace '\\','/')"
)
Start-Process -FilePath $edge -ArgumentList $args -Wait -NoNewWindow `
              -RedirectStandardError $log -RedirectStandardOutput ($log + ".out")

if (Test-Path $dest) {
  Write-Output ("{0}  {1:N0} bytes" -f (Split-Path $dest -Leaf), (Get-Item $dest).Length)
} else {
  Write-Output "capture FAILED (voir $log)"
}