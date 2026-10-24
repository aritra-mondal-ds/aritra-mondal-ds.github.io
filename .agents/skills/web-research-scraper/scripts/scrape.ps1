param(
    [Parameter(Mandatory=$true)]
    [string]$Url,
    [string]$OutputPath
)

function Get-ScrapedMarkdown {
    param([string]$targetUrl)

    # Strategy 1: GitHub Repository / File Handler
    if ($targetUrl -match "github\.com/([^/]+)/([^/]+)/blob/([^/]+)/(.+)") {
        $user = $matches[1]
        $repo = $matches[2]
        $branch = $matches[3]
        $path = $matches[4]
        $rawUrl = "https://raw.githubusercontent.com/$user/$repo/$branch/$path"
        Write-Host "[Strategy 1] Fetching raw GitHub file: $rawUrl" -ForegroundColor Cyan
        return (Invoke-RestMethod -Uri $rawUrl -TimeoutSec 15)
    }
    elseif ($targetUrl -match "github\.com/([^/]+)/([^/]+)/?$") {
        $user = $matches[1]
        $repo = $matches[2]
        $rawUrl = "https://raw.githubusercontent.com/$user/$repo/main/README.md"
        Write-Host "[Strategy 1] Fetching raw GitHub README: $rawUrl" -ForegroundColor Cyan
        try {
            return (Invoke-RestMethod -Uri $rawUrl -TimeoutSec 15)
        } catch {
            $rawUrlMaster = "https://raw.githubusercontent.com/$user/$repo/master/README.md"
            return (Invoke-RestMethod -Uri $rawUrlMaster -TimeoutSec 15)
        }
    }

    # Strategy 2: Jina Reader URL-to-Markdown (Zero-Config)
    Write-Host "[Strategy 2] Requesting clean Markdown via Jina Reader..." -ForegroundColor Cyan
    $jinaUrl = "https://r.jina.ai/$targetUrl"
    try {
        $response = Invoke-RestMethod -Uri $jinaUrl -Headers @{"Accept"="text/plain"} -TimeoutSec 20
        if ($response -and $response.Length -gt 50) {
            return $response
        }
    } catch {
        Write-Warning "Jina Reader unreachable or rate-limited: $($_.Exception.Message)"
    }

    # Strategy 3: Direct Web Request Fallback
    Write-Host "[Strategy 3] Direct HTTP Web Request fallback..." -ForegroundColor Cyan
    try {
        $web = Invoke-WebRequest -Uri $targetUrl -UseBasicParsing -TimeoutSec 15
        return $web.Content
    } catch {
        throw "Failed to fetch content from $targetUrl: $($_.Exception.Message)"
    }
}

try {
    $content = Get-ScrapedMarkdown -targetUrl $Url
    if ($OutputPath) {
        $parentDir = Split-Path -Path $OutputPath -Parent
        if ($parentDir -and -not (Test-Path $parentDir)) {
            New-Item -ItemType Directory -Path $parentDir -Force | Out-Null
        }
        $content | Out-File -FilePath $OutputPath -Encoding utf8
        Write-Host "[Success] Clean scraped content saved to: $OutputPath" -ForegroundColor Green
    } else {
        $content
    }
} catch {
    Write-Error $_.Exception.Message
    exit 1
}
