---
title: "Script to bulk remove Windows domain user profiles"
date: 2024-04-08
tags: ["Windows"]
#toc: true
---
<center><img src="windows-library.png" style="width: 100%";></center>

As more and more domain users sign in on a particular device, the more cluttered the drive becomes. Eventually new users are unable to sign in because the hard drive is simply out of free space.

If you simply delete domain user's folder from _C:\Users_ the user will never be able to sign in to his profile on that particular device -- he will be signed in to a temporary user account. 

So the proper way to remove a domain user's profile from a Windows 10/11 device is to go to _Settings_ > _System_ > _About_ > _Advanced System Settings_ > _Advanced_ > _User Profiles_ and then remove the user profiles one by one.

When you have thousands of user profiles it is not very convenient to remove them one by one so I stiched together two PowerShell scripts to address this issue.

###### Print all the domain user profiles not modified in X days

Basically not modified means not logged in. So this script will print a list of users who have not logged in for X days. Line 5 also contains a list of user profiles that should not be included in the query.

```powershell
$DaysSinceModified = 14 # Number of days since last modified

try {
    # Get all User profile folders
    $UserProfiles = Get-ChildItem "C:\Users" | Where-Object {$_ -notlike "*Windows*" -and $_ -notlike "*default*" -and $_ -notlike "*Public*" -and $_ -notlike "*Admin*"}

    # Filter the list of folders to only include those that are not associated with local user accounts
    $NonLocalProfiles = $UserProfiles | Where-Object { $_.Name -notin $(Get-LocalUser).Name }

    # Retrieve a list of user profiles not modified in specified days
    $OldProfiles = foreach ($profile in $NonLocalProfiles) {
        $LastWrite = $profile.LastWriteTime
        $DaysSinceLastModified = (New-TimeSpan -Start $LastWrite -End (Get-Date)).Days
        if ($DaysSinceLastModified -ge $DaysSinceModified) {
            $profile.FullName
        }
    }

    if ($OldProfiles) {
        Write-Warning "User profiles not modified in the last $DaysSinceModified days:"
        Write-Output $OldProfiles
        Exit 1
    } else {
        Write-Output "No profiles not modified in the last $DaysSinceModified days found. "
        Exit 0
    }
} catch {
    Write-Error $_
}
```

###### Remove all the domain user profiles not modified in X days

Same logic as in the above script when it comes to identifying particular user profiles, and in this case the identified user profiles will be REMOVED, so proceed with caution.

```powershell
$DaysSinceModified = 14 # Number of days since last modified

try {
    # Get all User profile folders
    $UserProfiles = Get-ChildItem "C:\Users" | Where-Object {$_ -notlike "*Windows*" -and $_ -notlike "*default*" -and $_ -notlike "*Public*" -and $_ -notlike "*Admin*"}

   # Filter the list of folders to only include those that are not associated with local user accounts
    $NonLocalProfiles = $UserProfiles | Where-Object { $_.Name -notin $(Get-LocalUser).Name }

    # Initialize an empty array to store removed profiles
    $RemovedProfiles = @()

    # Retrieve a list of user profiles not modified in specified days and remove them
    foreach ($profile in $NonLocalProfiles) {
        $LastWrite = $profile.LastWriteTime
        $DaysSinceLastModified = (New-TimeSpan -Start $LastWrite -End (Get-Date)).Days
        if ($DaysSinceLastModified -ge $DaysSinceModified) {
            $profilePath = $profile.FullName
            $RemovedProfiles += $profilePath
            $profileToRemove = Get-CimInstance -Class Win32_UserProfile | Where-Object { $_.LocalPath -eq $profilePath }
            $profileToRemove | Remove-CimInstance # This command removes the identified profiles 
        }
    }

    if ($RemovedProfiles) {
        Write-Output "Removed profiles not modified in the last $DaysSinceModified days:"
        Write-Output $RemovedProfiles
    } else {
        Write-Output "No profiles not modified in the last $DaysSinceModified days found. "
    }
} catch {
    Write-Error $_
}
```
