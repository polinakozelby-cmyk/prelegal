Set-Location (Join-Path $PSScriptRoot "..")

docker build -t prelegal .
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

docker rm -f prelegal 2>$null | Out-Null

docker run -d --name prelegal -p 3000:3000 prelegal
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Output "Prelegal is starting at http://localhost:3000"
