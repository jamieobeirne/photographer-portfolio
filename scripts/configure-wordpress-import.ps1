$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $PSScriptRoot
$envFile = Join-Path $projectRoot '.env.local'

$wpUsername = Read-Host 'WordPress username'
$wpPasswordSecure = Read-Host 'WordPress Application Password' -AsSecureString
$wpPassword = [System.Net.NetworkCredential]::new('', $wpPasswordSecure).Password

if ([string]::IsNullOrWhiteSpace($wpUsername) -or [string]::IsNullOrWhiteSpace($wpPassword)) {
  throw 'Both values are required. Nothing was saved.'
}

$existingLines = if (Test-Path -LiteralPath $envFile) {
  Get-Content -LiteralPath $envFile
} else {
  @()
}

$keptLines = $existingLines | Where-Object {
  $_ -notmatch '^WP_USERNAME=' -and $_ -notmatch '^WP_APPLICATION_PASSWORD='
}

@($keptLines) + @(
  "WP_USERNAME=$wpUsername"
  "WP_APPLICATION_PASSWORD=$wpPassword"
) | Set-Content -LiteralPath $envFile -Encoding utf8

Write-Host 'WordPress import credentials saved locally in .env.local.'
