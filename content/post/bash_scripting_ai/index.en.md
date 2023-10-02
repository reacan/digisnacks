---
title: "Bash scripting with ChatGPT"
date: 2023-10-02
tags: ["GNU/Linux", "CLI", "AI"]
---
Recently I was tasked with writting a Bash script that would querry IP addresses from a file and return their corresponding abuse contact e-mail addresses.

The script that I initially came up with did not perform as expected. Since I have heared stories about Chat GPT being able generate decent code, I decided to finally try it out. 

I was very amazed to say the least, Chat GPT came up with a Bash script in less than a few seconds.

<center><img src="Exhibit-A.png"></center>

This was the initial output of Chat GPT's script:

<center><img src="Exhibit-B.png"></center>

Couple of moments later I had my desired output:

<center><img src="Exhibit-C.png"></center>

{{< expandable label="Chat GPT's script:" level="2" >}}
```
#!/bin/bash

# Input file containing IP addresses (each IP address on a new line)
input_file="ip_addresses.txt"

# Output file to store IP address and abuse contact information
output_file="abuse_contacts.txt"

# Function to query abuse contact information for an IP address using whois
get_abuse_contact() {
    local ip_address="$1"
    local abuse_contact=$(whois -h whois.abuse.net "$ip_address" | grep "OrgAbuseEmail\|OrgAbusePhone" | awk '{print $2}')
    echo "IP Address: $ip_address" >> "$output_file"
    echo "Abuse Contact: $abuse_contact" >> "$output_file"
    echo "----------------------------------------" >> "$output_file"
}

# Read IP addresses from the input file and query abuse contact information for each IP
while IFS= read -r ip_address; do
    get_abuse_contact "$ip_address"
done < "$input_file"

echo "Abuse contacts have been retrieved and saved to $output_file."

```
{{< /expandable >}}
 
{{< expandable label="My refined version:" level="2" >}}
```
#!/bin/bash
green="\033[1;32m"
yellow="\033[1;33m"
reset="\033[m"
# Input file containing IP addresses (each IP address on a new line)
input_file="ip_addresses.txt"

# Output file to store IP address and abuse contact information
output_file="abuse_contacts_raw.txt"

#Refined output file with lines that have empty columns removed
output_file_no_empty_columns="abuse_contacts.txt"

echo ""
bash --version | awk "NR==1"
echo ""
echo -e "${yellow}Working...${reset}"
echo ""

# Function to query abuse contact information for an IP address using whois
get_abuse_contact() {
    local ip_address="$1"
    local abuse_contact=$(whois "$ip_address" | grep "Abuse contact for" | awk '{print $9}' | sed "s/'//g")
    echo "$ip_address $abuse_contact" >> "$output_file"
}

# Read IP addresses from the input file and query abuse contact information for each IP
while IFS= read -r ip_address; do
    get_abuse_contact "$ip_address"
done < "$input_file"
awk  '$2!=""' $output_file | sort -k2 > $output_file_no_empty_columns #removing lines that contain no contact info due to querrying local addresses and sorting
rm $output_file
echo -e "Abuse contacts have been retrieved and saved to ${green}$output_file_no_empty_columns${reset}:"
echo ""
cat $output_file_no_empty_columns
echo ""
```
{{< /expandable >}}

AI will steal people's jobs, there is no doubt about that, but at the same time it will change the way people work.

However I think unemployment is least of our worries when it comes to AI. It does have a scary potential.

 


