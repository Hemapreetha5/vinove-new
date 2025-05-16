$debug = $false
$total = 0
$renamed = 0
$outputStep = 1000
$nextOutputIndex = $outputStep

# Determine script location for PowerShell
$currentDir = Split-Path $script:MyInvocation.MyCommand.Path

Write-Host "CWD: $($currentDir)"

$Logfile = "$($currentDir)\logs"
# create logs folder
if ((Test-Path $Logfile -PathType Container) -eq $false) {
    New-Item -Path $Logfile -ItemType Directory | OUT-NULL
}

$Logfile = "$($Logfile)\rename-job-$(get-date -f yyyy-MM-dd-HHmmss).log"
# StreamWriter is the fastest way to write logs to file
$sw = new-object system.IO.StreamWriter($Logfile)

Function LogWrite {
    Param ([string]$logstring)
    $sw.WriteLine($logstring)
}

Try {

    # $outputText = New-Object -TypeName System.Text.StringBuilder
    LogWrite("Process started at $(Get-Date)")

    # Rename files first
    Get-ChildItem -recurse | ForEach-Object { 
        try {
            $total += 1
            if ($_.Name -CMatch "[A-Z]") {
                # Do processing only if the name has a capital letter

                $NewName = $_.Name.ToLowerInvariant()
                if ($_.Name -cne $NewName) {
                    if ($_.PSIsContainer) {
                        # Folders
                        if ($debug) { Write-Host "REN FOL $($_.FullName) -> $($NewName)" -BackgroundColor "Cyan" -ForegroundColor "Black" }

                        # Set temporary name to enable rename to the same name; Windows is not case sensitive
                        $TempItem = Rename-Item -Path $_.FullName -NewName "tmp__$NewName" -PassThru
    
                        Rename-Item -Path $TempItem.FullName -NewName $NewName
                    }
                    else {
                        # Files
                        if ($debug) { Write-Host "REN FILE $($_.FullName) -> $($NewName)" -BackgroundColor "Green" -ForegroundColor "Black" }
                        Rename-Item $_.FullName $NewName 
                    }
                    LogWrite("$($_.Name) -> $($NewName)")
                    $renamed += 1
                }
                # else {
                #     if ($debug) { Write-Host "SKIP LOWER "($_.FullName) -BackgroundColor "Yellow" -ForegroundColor "Black" }
                # }
            }
        }
        catch {
            Write-Host $_ -BackgroundColor "Red" -ForegroundColor "Black"
        }

        if ($total -eq $nextOutputIndex) {
            $nextOutputIndex += $outputStep
            Write-Progress -Activity 'Lowercase job' -Status "$($renamed)/$($total) items renamed so far"
        }
    }

    LogWrite("Process completed at $(Get-Date)")
    LogWrite("$($renamed)/$($total) items renamed")
}
catch {
    
}
finally {
    if ($null -ne $sw) { $sw.close() }
}

Write-Host "`r`nReport:"
Write-Host "$($renamed)/$($total) items renamed`r`n"
