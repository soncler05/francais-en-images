param(
  [int]$Width = 1280,
  [int]$Height = 1400,
  [string]$Tag = "desktop",
  [int]$From = 1,
  [int]$To = 10,
  [int]$Budget = 12000
)

# Headless screenshots of the reader, one file per page.
$edge   = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$outDir = Join-Path $PSScriptRoot "shots"
$tmp    = "C:\Users\soncl\AppData\Local\Temp\opencode"
New-Item -ItemType Directory -Force -Path $outDir | Out-Null
$profile = Join-Path $tmp "edgeprof-$Tag"
$log     = Join-Path $tmp "edge-$Tag.log"

foreach ($i in $From..$To) {
  $file = Join-Path $tmp "$Tag-$i.png"
  if (Test-Path $file) { Remove-Item $file -Force }

  $args = @(
    "--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check",
    "--user-data-dir=$profile", "--hide-scrollbars",
    # sans cette option la capture attrape la page en plein fondu d'entrée
    "--force-prefers-reduced-motion",
    "--window-size=$Width,$Height",
    "--screenshot=$file",
    "--virtual-time-budget=$Budget",
    # photos=toutes désactive le chargement paresseux : Edge en mode headless
    # ne fait pas défiler la page, donc la capture ne montrerait qu'une rangée
    "http://localhost:8765/index.html?photos=toutes#$i"
  )
  Start-Process -FilePath $edge -ArgumentList $args -Wait -NoNewWindow `
                -RedirectStandardError $log -RedirectStandardOutput ($log + ".out")

  if (Test-Path $file) {
    $dest = Join-Path $outDir ("{0}-{1:d2}.png" -f $Tag, $i)
    Move-Item $file $dest -Force
    Write-Output ("{0}  {1:N0} bytes" -f (Split-Path $dest -Leaf), (Get-Item $dest).Length)
  } else {
    Write-Output "page $i FAILED"
  }
}
