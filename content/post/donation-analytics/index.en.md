---
title: "Linux, Python & AI: Analysis of Political Donations"
date: 2024-02-10
lastmod: 2024-02-12
tags: ["GNU/Linux", "Python", "AI", "politics"]
toc: true
---
## About the analysis

I sought to exercise my data analysis skills with an intriguing dataset. I wanted to focus on data analysis rather than data collection, so I needed interesting and readily accessible data. It turns out that the [KNAB party finance database](https://info.knab.gov.lv/lv/db/ziedojumi/) offers the convenience of extracting and storing all the information using just a web browser.
<br>
<br>
To preserve all the information, I needed five iterations due to the large volume of data, dividing the information by years. Subsequently, I used _Bash_ to slightly format all the information and merge it into a single _.csv_ file.
<br>
<br>
Data analysis was conducted using _Python_ scripts, which were not solely my creation but were crafted with the assistance of artificial intelligence. I had a lot of fun analyzing this data and I will get back to it when I'll have more time to spare, so this article will be definitely updated.
<br>
<br>
For anyone interested in experimenting with this data, the _.csv_ file is available [here](unified.csv), it contains 75279 lines, supposedly all the public information on donations to political parties in Latvia from year 2002 till 2024.
<br>

## Number of unique donors

{{< expandable label="Python script" level="2" >}}
```python
import pandas as pd
import re

# Load up that unified dataset
data = pd.read_csv('unified.csv')

# Define a function to determine if the row contains a legal person
def determine_person_type(persona):
    if any(entity in persona for entity in ["AS", "SIA", "Biedrība", "Asociācija"]):
        return 'legal'
    else:
        return 'natural'

# Add a new column to the DataFrame indicating the type of person
data['Person Type'] = data['Persona'].apply(determine_person_type)

# Extract unique natural and legal persons
unique_natural_persons = data[data['Person Type'] == 'natural']['Persona'].unique()
unique_legal_persons = data[data['Person Type'] == 'legal']['Persona'].unique()

# Count the number of unique persons
total_unique_persons_count = len(unique_natural_persons) + len(unique_legal_persons)

# Print the total number of unique persons, unique natural persons, and unique legal persons
print("Number of unique persons:", total_unique_persons_count)
print("Number of unique natural persons:", len(unique_natural_persons))
print("Number of unique legal persons:", len(unique_legal_persons))
```
{{< /expandable >}}

```
Donations to Latvian political parties from year 2002 till 2024.
Number of unique donors.

Unique donors: 21235
Natural persons: 20840
Legal persons: 395

```

## Top 20 most generous donors

{{< expandable label="Python script" level="2" >}}
```python
import pandas as pd
import re

# Load up that unified dataset
data = pd.read_csv('unified.csv')

# Define a function to extract the currency from the Summa (EUR) string
def extract_currency(summa):
    match = re.search(r'([A-Z]+)', str(summa))
    if match:
        return match.group(0)
    else:
        return None

# Convert LVL to EUR using a conversion rate (assuming 1 LVL = 1.42288  EUR)
def convert_to_eur(summa):
    currency = extract_currency(summa)
    if currency == 'LVL':
        amount = float(summa.sPLIt()[1].replace(',', ''))
        return amount * 1.42288 
    elif currency == 'EUR':
        return float(summa.sPLIt()[1].replace(',', ''))
    else:
        return None

# Treat refunds as negative amounts
data['Summa (EUR)'] = data['Summa (EUR)'].apply(lambda x: -float(x.sPLIt()[1].replace(',', '')) if x.startswith('EUR -') else convert_to_eur(x))

# Group by Persona and sum up their donations
persona_totals = data.groupby('Persona').agg({'Summa (EUR)': ['sum', 'count']}).reset_index()
persona_totals.columns = ['Persona', 'Kopējā summa (EUR)', 'Reizes ziedots']

# Sort them ballers by total amount and number of donations, from highest to lowest
top_ballers = persona_totals.sort_values(by=['Kopējā summa (EUR)', 'Reizes ziedots'], ascending=False)

# Print the top ballers with the number of times they donated
print("Ziedojumi politiskajām partijām no 2002. līdz 2024.gadam:")
print(f"{'Persona':<40}{'Kopējā summa (EUR)':>20}{'Reizes ziedots':>18}")
print("-" * 80)
for i, (persona, summa, times_donated) in enumerate(zip(top_ballers['Persona'], top_ballers['Kopējā summa (EUR)'], top_ballers['Reizes ziedots']), 1):
    print(f"{i:<6}{persona:<40}{summa:>10.2f}{times_donated:>18}")

```
{{< /expandable >}}

```
Donations to Latvian political parties from year 2002 till 2024.
Top 20 most generous donors.

         Person                          Amount (EUR)      # of donations
-------------------------------------------------------------------------
1     Tatjana Ždanoka                     264150.05               165
2     Arnis Vējš                          209398.24                26
3     Andris Ameriks                      205596.48                16
4     Andris Šķēle                        191377.36                12
5     Margarita Brikmane                  174004.11                18
6     Normunds Bergs                      172955.08                16
7     Leons Jakrins                       172431.34                23
8     Jānis Bergs                         166618.10                14
9     Sandra Kalniete                     163358.22               189
10    Aivars Bergers                      163120.75                51
11    Pēteris Vinķelis                    157498.68                79
12    Aleksandrs Brandavs                 154471.03                29
13    Inese Vaidere                       149526.10               145
14    Ainārs Ščipčinskis                  147606.72                11
15    Edgars Čeporjus                     139222.03                23
16    Juris Visockis                      137697.22                50
17    Olafs Berķis                        136674.66                12
18    Sergejs Gridņevs                    136257.74                17
19    Ainārs Šlesers                      133553.79                22
20    Dainis Liepiņš                      125219.42                45

```
<br>  
    
## Top 20 most generous donors and their beneficiaries

{{< expandable label="Python script" level="2" >}}
```python
import pandas as pd
import re

# Load up that unified dataset
data = pd.read_csv('unified.csv')

# Define a function to extract the currency from the Summa (EUR) string
def extract_currency(summa):
    match = re.search(r'([A-Z]+)', str(summa))
    if match:
        return match.group(0)
    else:
        return None

# Convert LVL to EUR using a conversion rate (assuming 1 LVL = 1.42288  EUR)
def convert_to_eur(summa):
    currency = extract_currency(summa)
    if currency == 'LVL':
        amount = float(summa.split()[1].replace(',', ''))
        return amount * 1.42288 
    elif currency == 'EUR':
        return float(summa.split()[1].replace(',', ''))
    else:
        return None

# Treat refunds as negative amounts
data['Summa (EUR)'] = data['Summa (EUR)'].apply(lambda x: -float(x.split()[1].replace(',', '')) if x.startswith('EUR -') else convert_to_eur(x))

# Group by Persona and sum up their donations
persona_totals = data.groupby(['Persona', 'Partija']).agg({'Summa (EUR)': ['sum', 'count']}).reset_index()
persona_totals.columns = ['Persona', 'Partija', 'Kopējā summa (EUR)', 'Reizes ziedots']

# Sort the top ballers by total donation amount, from highest to lowest
top_ballers = persona_totals.groupby('Persona').sum().sort_values(by='Kopējā summa (EUR)', ascending=False)

# Print the top ballers with the parties they donated to
print("Top ballers and the parties they have donated to:")
print(f"{'Persona':<40}{'Partija':<50}{'Kopējā summa (EUR)':>20}{'Reizes ziedots':>18}")
print("-" * 120)

for persona in top_ballers.index:
    party_donations = persona_totals[persona_totals['Persona'] == persona]
    for idx, row in party_donations.iterrows():
        print(f"{row['Persona']:<40}{row['Partija']:<50}{row['Kopējā summa (EUR)']:>10.2f}{row['Reizes ziedots']:>18}")
```
{{< /expandable >}}

```
Donations to Latvian political parties from year 2002 till 2024.
Top 20 most generous donors and their beneficiaries.

         Person                     Party                   Amount (EUR)
------------------------------------------------------------------------
1    Tatjana Ždanoka        Latvijas Krievu savienība        239320.80
1    Tatjana Ždanoka        Līdztiesība                      1067.16
1    Tatjana Ždanoka        PCTVL                            23762.10
2    Arnis Vējš             Jaunais laiks                    4268.64
2    Arnis Vējš             Jaunā Vienotība                  60840.64
2    Arnis Vējš             Zatlera Reformu partija          9960.16
2    Arnis Vējš             Vienotība                        134328.80
3    Andris Ameriks         Politiskā apvienība "Centrs"     7114.40
3    Andris Ameriks         Gods Kalpot Rīgai                101726.24
3    Andris Ameriks         Latvijas Pirmā partija           56915.20
3    Andris Ameriks         Šlesera Reformu partija          14228.80
3    Andris Ameriks         Par Labu Latviju                 25611.84
4    Andris Šķēle           Par Labu Latviju                 51223.68
4    Andris Šķēle           Tautas partija                   140153.68
5    Margarita Brikmane     Par Labu Latviju                 12805.92
5    Margarita Brikmane     Saskaņa                          41634.00
5    Margarita Brikmane     Saskaņas Centrs                  39802.21
5    Margarita Brikmane     Tautas partija                   70968.99
5    Margarita Brikmane     Vienoti Latvijai                 8793.00
6    Normunds Bergs         Jaunā Vienotība                  28343.24
6    Normunds Bergs         Latvijas Zaļā partija            11383.04
6    Normunds Bergs         PLI                              2000.00
6    Normunds Bergs         Vienotība                        131228.80
7    Leons Jakrins          Apvienotais saraksts             1890.00
7    Leons Jakrins          Tēvzemei un Brīvībai/LNNK        97331.48
7    Leons Jakrins          Jaunais laiks                    30307.34
7    Leons Jakrins          Jaunā Vienotība                  10000.06
7    Leons Jakrins          Latvijas attīstībai              29995.00
7    Leons Jakrins          Nacionālais bloks                996.02
7    Leons Jakrins          Reģionu alianse                  1911.44
8    Jānis Bergs            Jaunais laiks                    2845.76
8    Jānis Bergs            Jaunā Vienotība                  69772.34
8    Jānis Bergs            Progresīvie                      2000.00
8    Jānis Bergs            Vienotība                        92000.00
9    Sandra Kalniete        Jaunais laiks                    1429.99
9    Sandra Kalniete        Jaunā Vienotība                  286.02
9    Sandra Kalniete        Pilsoniskā savienība             50197.26
9    Sandra Kalniete        Vienotība                        111444.95
10   Aivars Bergers         Jaunais Centrs                   33999.11
10   Aivars Bergers         Saskaņa                          77750.00
10   Aivars Bergers         Saskaņas Centrs                  51371.64
11   Pēteris Vinķelis       Jaunais laiks                    85.37
11   Pēteris Vinķelis       Jaunā Vienotība                  16054.10
11   Pēteris Vinķelis       Kustība "Par!"                   10963.10
11   Pēteris Vinķelis       Pilsoniskā savienība             26913.72
11   Pēteris Vinķelis       PLI                              26282.00
11   Pēteris Vinķelis       Progresīvie                      25.00
11   Pēteris Vinķelis       Vienotība                        77175.39
12   Aleksandrs Brandavs    Gods Kalpot Rīgai                101090.27
12   Aleksandrs Brandavs    Latvijas Pirmā partija           8544.39
12   Aleksandrs Brandavs    Šlesera Reformu partija          19224.53
12   Aleksandrs Brandavs    Par Labu Latviju                 25611.84
13   Inese Vaidere          Tēvzemei un Brīvībai/LNNK        11952.19
13   Inese Vaidere          Jaunā Vienotība                  6325.16
13   Inese Vaidere          Pilsoniskā savienība             35393.00
13   Inese Vaidere          Vienotība                        95855.75
14   Ainārs Ščipčinskis     Jaunais laiks                    25611.84
14   Ainārs Ščipčinskis     Jaunā Vienotība                  22766.08
14   Ainārs Ščipčinskis     Latvijas attīstībai              94228.80
14   Ainārs Ščipčinskis     PLI                              5000.00
15   Edgars Čeporjus        Latvijas attīstībai              117722.03
15   Edgars Čeporjus        Izaugsme                         21500.00
16   Juris Visockis         Jaunais Centrs                   49.80
16   Juris Visockis         Jaunais laiks                    87869.95
16   Juris Visockis         Jaunā Vienotība                  7114.40
16   Juris Visockis         Latvijas Ceļš                    15295.96
16   Juris Visockis         Vienotība                        27224.82
16   Juris Visockis         Visu Latvijai!                   142.29
17   Olafs Berķis           Jaunā Vienotība                  19574.57
17   Olafs Berķis           Latvijas attīstībai              115000.09
17   Olafs Berķis           PLI                              2100.00
18   Sergejs Gridņevs       Jaunais Centrs                   8537.28
18   Sergejs Gridņevs       Jaunais laiks                    7114.40
18   Sergejs Gridņevs       Latvija pirmajā vietā            620.00
18   Sergejs Gridņevs       Latvijas Ceļš                    21342.06
18   Sergejs Gridņevs       Šlesera Reformu partija          39126.35
18   Sergejs Gridņevs       Par Labu Latviju                 19916.05
18   Sergejs Gridņevs       Saskaņa                          25372.80
18   Sergejs Gridņevs       Saskaņas Centrs                  14228.80
19   Ainārs Šlesers         Jaunā Kristīgā partija           1422.88
19   Ainārs Šlesers         Latvija Pirmajā vietā            22000.00
19   Ainārs Šlesers         Latvijas Pirmā partija           70290.27
19   Ainārs Šlesers         Šlesera Reformu partija          14228.80
19   Ainārs Šlesers         Par Labu Latviju                 25611.84
20   Dainis Liepiņš         Apvienotais saraksts             46845.00
20   Dainis Liepiņš         Latvijas Pirmā partija           42401.82
20   Dainis Liepiņš         Latvijas reģionu apvienība       4465.00
20   Dainis Liepiņš         Šlesera Reformu partija          7114.40
20   Dainis Liepiņš         Par Labu Latviju                 14228.80
20   Dainis Liepiņš         Reģionu alianse                  10164.40
```

<br>

## Top 20 most generous donors -- legal entities, and their beneficiaries

{{< expandable label="Python script" level="2" >}}
```python
import pandas as pd
import re

# Load up that unified dataset
data = pd.read_csv('unified.csv')

# Define a function to extract the currency from the Summa (EUR) string
def extract_currency(summa):
    match = re.search(r'([A-Z]+)', str(summa))
    if match:
        return match.group(0)
    else:
        return None

# Convert LVL to EUR using a conversion rate (assuming 1 LVL = 1.42288  EUR)
def convert_to_eur(summa):
    currency = extract_currency(summa)
    if currency == 'LVL':
        amount = float(summa.split()[1].replace(',', ''))
        return amount * 1.42288 
    elif currency == 'EUR':
        return float(summa.split()[1].replace(',', ''))
    else:
        return None

# Treat refunds as negative amounts
data['Summa (EUR)'] = data['Summa (EUR)'].apply(lambda x: -float(x.split()[1].replace(',', '')) if x.startswith('EUR -') else convert_to_eur(x))

# Group by Persona and sum up their donations
persona_totals = data.groupby(['Persona', 'Partija']).agg({'Summa (EUR)': ['sum', 'count']}).reset_index()
persona_totals.columns = ['Persona', 'Partija', 'Kopējā summa (EUR)', 'Reizes ziedots']

# Filter out legal persons
legal_persons = persona_totals[persona_totals['Persona'].str.contains(r'\bAS\b|\bSIA\b|\bBiedrība\b|\bAsociācija\b')]

# Sort the top legal persons by total donation amount, from highest to lowest
top_legal_persons = legal_persons.groupby('Persona').sum().sort_values(by='Kopējā summa (EUR)', ascending=False)

# Print the top legal persons with the parties they donated to
print("Top legal persons and the parties they have donated to:")
print(f"{'#':<5}{'Persona':<40}{'Partija':<50}{'Kopējā summa (EUR)':>20}")
print("-" * 120)

for i, (persona, summa) in enumerate(zip(top_legal_persons.index, top_legal_persons['Kopējā summa (EUR)']), 1):
    party_donations = legal_persons[legal_persons['Persona'] == persona]
    for idx, row in party_donations.iterrows():
        print(f"{i:<5}{row['Persona']:<40}{row['Partija']:<50}{row['Kopējā summa (EUR)']}")
```
{{< /expandable >}}


```
Donations to Latvian political parties from year 2002 till 2024.
Top 20 legal entities by amount and the parties they have donated to.

        Legal entity                       Party           Amount (EUR)
-----------------------------------------------------------------------
1    SIA Intersource Baltic LTD       Jaunais laiks          38283.72
2    SIA VEF un Ko                    LSDSP                  35572.00
3    SIA Alūksnes Piensaimnieks       Tautas partija         35572.00
4    SIA Pamati                       Tautas partija         35572.00
5    SIA Ošukalns                     Tautas partija         35572.00
6    AS Rietumu Banka                 Jaunais laiks          35572.00
7    SIA Tezei S                      Tautas partija         34860.56
8    SIA Enri Holding                 PCTVL                  34319.86
9    SIA GPA                          Tautas partija         31303.35
10   SIA Inko Partneri                Tautas partija         31303.35
11   AS Liepājas SEZ                  Jaunais laiks          28457.60
12   SIA Paix                         Tautas partija         28457.60
13   SIA Jelgavas Mežs                Latvijas Ceļš          28457.60
14   SIA Natre                        Latvijas Ceļš          28457.60
15   SIA Conrad Holding Group         Tautas partija         27746.15
16   SIA Lido Nafta                   Latvijas Ceļš          26892.43
17   SIA Tranzīta Termināls           TB/LNNK                14228.80
17   SIA Tranzīta Termināls           Latvijas Ceļš          9447.92
18   SIA Tilts                        Jaunais laiks          7114.40
18   SIA Tilts                        Krievu partija         455.32
18   SIA Tilts                        Latvijas Ceļš          14228.80
19   SIA Alpha Osta                   Jaunais laiks          21343.19
20   Domuss SIA                       Jaunais laiks          21343.19
```

<br>

## Top 20 most frequent donors

{{< expandable label="Python script" level="2" >}}
```python
import pandas as pd
import re

# Load up that unified dataset
data = pd.read_csv('unified.csv')

# Define a function to extract the currency from the Summa (EUR) string
def extract_currency(summa):
    match = re.search(r'([A-Z]+)', str(summa))
    if match:
        return match.group(0)
    else:
        return None

# Convert LVL to EUR using a conversion rate (assuming 1 LVL = 1.42288 EUR)
def convert_to_eur(summa):
    currency = extract_currency(summa)
    if currency == 'LVL':
        amount = float(summa.split()[1].replace(',', ''))
        return amount * 1.42288
    elif currency == 'EUR':
        return float(summa.split()[1].replace(',', ''))
    else:
        return None

# Treat refunds as negative amounts and apply currency conversion
data['Summa (EUR)'] = data['Summa (EUR)'].apply(lambda x: -float(x.split()[1].replace(',', '')) if x.startswith('EUR -') else convert_to_eur(x))

# Group by Persona and sum up their donations
persona_totals = data.groupby('Persona').agg({'Summa (EUR)': ['sum', 'count']}).reset_index()
persona_totals.columns = ['Persona', 'Kopējā summa (EUR)', 'Reizes ziedots']

# Sort them ballers by total amount and number of donations, from highest to lowest
top_ballers = persona_totals.sort_values(by=['Reizes ziedots', 'Kopējā summa (EUR)'], ascending=False)

# Print the top ballers with the number of times they donated
print("Ziedojumi politiskajām partijām no 2002. līdz 2024.gadam:")
print(f"{'Persona':<40}{'Kopējā summa (EUR)':>20}{'Reizes ziedots':>18}")
print("-" * 80)
for i, (persona, summa, times_donated) in enumerate(zip(top_ballers['Persona'], top_ballers['Kopējā summa (EUR)'], top_ballers['Reizes ziedots']), 1):
    print(f"{i:<6}{persona:<40}{summa:>10.2f}{times_donated:>18}")
```
{{< /expandable >}}

```
Donations to Latvian political parties from year 2002 till 2024.
Top 20 most frequent donors.

         Person                        Amount (EUR)    # of times donated
-------------------------------------------------------------------------
1     Roberts Dilba                      40836.69              244
2     Mārtiņš Vaivars                    2490.00               237
3     Sandra Kalniete                    163358.22             189
4     Tatjana Ždanoka                    264150.05             165
5     Augusts Brigmanis                  106128.29             155
6     Inese Vaidere                      149526.10             145
7     Miroslavs Mitrofanovs              79350.39              135
8     Guntis Bērziņš                     33373.94              121
9     Juris Pūce                         45586.00              112
10    Andris Bērziņš                     90389.33              107
11    Artūrs Rubiks                      38111.73              107
12    Anonīms                            3935.81               106
13    Ingars Burlaks                     18047.37              105
14    Kārlis Šadurskis                   102366.28             103
15    Arturs Krišjānis Kariņš            88713.64              100
16    Ivans Ribakovs                     55606.68              100
17    Vitālijs Orlovs                    51265.29              98
18    Andris Rubins                      40210.70              98
19    Indulis Tupesis                    7134.75               98
20    Vladimirs Frolovs                  40534.17              95
```

<br>

## Top 10 parties by donation amount

{{< expandable label="Python script" level="2" >}}
```python
import pandas as pd
import re

# Load up that unified dataset
data = pd.read_csv('unified.csv')

# Define a function to extract the currency from the Summa (EUR) string
def extract_currency(summa):
    match = re.search(r'([A-Z]+)', str(summa))
    if match:
        return match.group(0)
    else:
        return None

# Convert LVL to EUR using a conversion rate (assuming 1 LVL = 1.42288 EUR)
def convert_to_eur(summa):
    currency = extract_currency(summa)
    if currency == 'LVL':
        amount = float(summa.split()[1].replace(',', ''))
        return amount * 1.42288
    else:
        return summa

# Treat refunds as negative amounts
data['Summa (EUR)'] = data['Summa (EUR)'].apply(lambda x: -float(x.split()[1].replace(',', '')) if x.startswith('EUR -') else float(x.split()[1].replace(',', '')))

# Group by Party and sum up their donations
party_totals = data.groupby('Partija').agg({'Summa (EUR)': ['sum', 'count']}).reset_index()
party_totals.columns = ['Partija', 'Kopējā summa (EUR)', 'Reizes saņemts ziedojums']

# Sort parties by total amount and number of donations, from highest to lowest
top_parties = party_totals.sort_values(by=['Kopējā summa (EUR)', 'Reizes saņemts ziedojums'], ascending=False)

# Print the top parties with the number of times they received donations
print("Politiskās partijas, kas saņēmušas visvairāk ziedojumu no 2002. līdz 2024.gadam:")
print(f"{'Partija':<40}{'Kopējā summa (EUR)':>30}{'Reizes saņemts ziedojums':>35}")
print("-" * 80)
for i, (party, summa, times_donated) in enumerate(zip(top_parties['Partija'], top_parties['Kopējā summa (EUR)'], top_parties['Reizes saņemts ziedojums']), 1):
    # Check if the party name is longer than a certain length
    if len(party) > 40:
        # Split the party name into two lines
        party_lines = [party[:40], party[40:]]
        # Print the first line
        print(f"{i:<6}{party_lines[0]:<50}{summa:>10.2f}{times_donated:>26}")
        # Print the second line with adjusted spacing
        print(f"{'':<6}{party_lines[1]:<40}")
    else:
        # Print the party name with standard formatting
        print(f"{i:<6}{party:<40}{summa:>10.2f}{times_donated:>26}")
```
{{< /expandable >}}





```
Donations to Latvian political parties from year 2002 till 2024.
Top 10 parties by donation amount.

            Party                      Amount (EUR)       Donation count
-------------------------------------------------------------------------
1     Zaļo un Zemnieku savienība       4772446.77             4029
2     Vienotība                        4337851.74             5116
3     Saskaņa                          3548203.03             4419
4     Jaunais laiks                    3247438.85             4386
5     Tautas partija                   3153758.69             1326
6     Latvijas attīstībai              2392672.50             2046
7     LSDSP                            1933022.13             1782
8     Latvijas Zemnieku savienība      1551792.63             3331
9     Latvijas Pirmā partija           1335026.38             720
10    Nacionālā apvienība              1271256.30             2544
```

<br>

## Top 10 parties by donation count

{{< expandable label="Python skripts" level="2" >}}
```python
import pandas as pd
import re

# Load up that unified dataset
data = pd.read_csv('unified.csv')

# Define a function to extract the currency from the Summa (EUR) string
def extract_currency(summa):
    match = re.search(r'([A-Z]+)', str(summa))
    if match:
        return match.group(0)
    else:
        return None

# Convert LVL to EUR using a conversion rate (assuming 1 LVL = 1.42288 EUR)
def convert_to_eur(summa):
    currency = extract_currency(summa)
    if currency == 'LVL':
        amount = float(summa.split()[1].replace(',', ''))
        return amount * 1.42288
    else:
        return summa

# Treat refunds as negative amounts
data['Summa (EUR)'] = data['Summa (EUR)'].apply(lambda x: -float(x.split()[1].replace(',', '')) if x.startswith('EUR -') else float(x.split()[1].replace(',', '')))

# Group by Party and sum up their donations
party_totals = data.groupby('Partija').agg({'Summa (EUR)': ['sum', 'count']}).reset_index()
party_totals.columns = ['Partija', 'Kopējā summa (EUR)', 'Reizes saņemts ziedojums']

# Sort parties by total amount and number of donations, from highest to lowest
top_parties = party_totals.sort_values(by=['Reizes saņemts ziedojums', 'Kopējā summa (EUR)'], ascending=False)

# Print the top parties with the number of times they received donations
print("Politiskās partijas, kas saņēmušas visvairāk ziedojumu no 2002. līdz 2024.gadam:")
print(f"{'Partija':<40}{'Kopējā summa (EUR)':>50}{'Reizes saņemts ziedojums':>56}")
print("-" * 80)
for i, (party, summa, times_donated) in enumerate(zip(top_parties['Partija'], top_parties['Kopējā summa (EUR)'], top_parties['Reizes saņemts ziedojums']), 1):
    # Check if the party name is longer than a certain length
    if len(party) > 40:
        # Split the party name into two lines
        party_lines = [party[:40], party[40:]]
        # Print the first line
        print(f"{i:<6}{party_lines[0]:<50}{summa:>10.2f}{times_donated:>26}")
        # Print the second line with adjusted spacing
        print(f"{'':<6}{party_lines[1]:<40}")
    else:
        # Print the party name with standard formatting
        print(f"{i:<6}{party:<40}{summa:>10.2f}{times_donated:>26}")

```
{{< /expandable >}}


```
Donations to Latvian political parties from year 2002 till 2024.
Top 10 parties by donation count.

            Party                   Amount (EUR)      Donation count
----------------------------------------------------------------------
1     Konservatīvie                 609418.28               6879
2     Vienotība                     4337851.74              5116
3     Saskaņa                       3548203.03              4419
4     Jaunais laiks                 3247438.85              4386
5     Progresīvie                   523976.60               4186
6     Zaļo un Zemnieku savienība    4772446.77              4029
7     Latvijas Zemnieku savienība   1551792.63              3331
8     Kustība "Par!"                316012.44               2972
9     Nacionālā apvienība           1271256.30              2544
10    Latvijas attīstībai           2392672.50              2046
```

<br>

## Anonymous donations not transferred to the state

According to the Cabinet of Ministers regulation No.751 of August 31, 2004, political parties are not allowed to retain anonymous donations, and they must be transferred to state property.

For the majority of the recorded anonymous donations in the data, there were corresponding entries with negative values, but not all. Upon reviewing the database available on the KNAB website, the result is similar. Either the parties have not actually repaid these amounts, or the database is inaccurate. However these amounts are negligible and do not warrant concern.


{{< expandable label="Python script" level="2" >}}
```python
import pandas as pd

# Load up that unified dataset
data = pd.read_csv('unified.csv')

# Filter the dataset to only include rows where the name is "Anonīms"
anon_donations = data[data['Persona'] == 'Anonīms']

# Initialize total donation and returned donation amounts
total_donation_amount = 0
returned_donation_amount = 0

# Initialize a set to store parties that have returned the donations
parties_returned = set()

# Initialize a dictionary to store transactions for each party
party_transactions = {}

# Print header
print("Partijas, kas nav atgriezušas ziedojumus:\n")

# Loop through each donation in the filtered dataset
for index, row in anon_donations.iterrows():
    # Extract donation amount and remove any leading or trailing spaces
    donation_amount = row['Summa (EUR)'].split('EUR')
    cleaned_amounts = [amount.strip() for amount in donation_amount if amount.strip()]
    # Loop through cleaned amounts
    for amount in cleaned_amounts:
        # Check if amount starts with "-" to handle refunds
        if amount.startswith('-'):
            # Subtract refunded donation amount from the total
            returned_donation_amount += float(amount[1:])
            # Add party to the set of parties that have returned the donations
            parties_returned.add(row['Partija'])
        else:
            # Add non-refunded donation amount to the total
            total_donation_amount += float(amount.strip())
            # Add transaction to the dictionary
            if row['Partija'] not in party_transactions:
                party_transactions[row['Partija']] = []
            party_transactions[row['Partija']].append((amount.strip(), row['Datums']))

# Calculate total unreturned donation amount
total_unreturned_donation_amount = total_donation_amount - returned_donation_amount

# Print total unreturned donation amount
print(f"Kopējais neatgrieztais ziedojumu daudzums: {total_unreturned_donation_amount:.2f} EUR\n")

# Print parties that have not returned the donations
for party in set(anon_donations['Partija']) - parties_returned:
    print(f"{party.strip()}:")
    # Print transactions with dates for each party
    for transaction in party_transactions[party]:
        print(f"  - Summa: {transaction[0]} EUR, Datums: {transaction[1]}")


```
{{< /expandable >}}



```
Donations to Latvian political parties from year 2002 till 2024.
Parties that have not transferred anonymous donations to state property.

Amount of anonymous donations not transferred to the state: 300.23 EUR

Latvijas Krievu savienība:

  - Amount: 5.00 EUR, Date: 15.09.2022
  - Amount: 50.00 EUR, Date: 04.03.2022
  - Amount: 200.00 EUR, Date: 20.05.2019

Zaļo un Zemnieku savienība:

  - Amount: 0.01 EUR, Date: 28.01.2019
  - Amount: 0.01 EUR, Date: 21.01.2019
  - Amount: 0.01 EUR, Date: 14.01.2019
  - Amount: 0.01 EUR, Date: 07.01.2019

Saskaņa:

  - Amount: 0.01 EUR, Date: 28.05.2019
  - Amount: 0.01 EUR, Date: 21.05.2019
  - Amount: 0.01 EUR, Date: 14.05.2019
  - Amount: 0.01 EUR, Date: 07.05.2019
  - Amount: 0.01 EUR, Date: 30.04.2019
  - Amount: 0.01 EUR, Date: 23.04.2019
  - Amount: 0.01 EUR, Date: 16.04.2019
  - Amount: 0.01 EUR, Date: 09.04.2019
  - Amount: 0.01 EUR, Date: 02.04.2019
  - Amount: 0.01 EUR, Date: 26.03.2019
  - Amount: 0.01 EUR, Date: 12.03.2019
  - Amount: 0.01 EUR, Date: 05.03.2019
  - Amount: 5.00 EUR, Date: 27.02.2019
  - Amount: 0.01 EUR, Date: 26.02.2019
  - Amount: 0.01 EUR, Date: 19.02.2019
  - Amount: 0.01 EUR, Date: 12.02.2019
  - Amount: 0.01 EUR, Date: 05.02.2019
  - Amount: 0.01 EUR, Date: 29.01.2019
  - Amount: 0.01 EUR, Date: 15.01.2019
  - Amount: 0.01 EUR, Date: 02.01.2019
```
<br>

## My ranking in the donor list

Made this donation back in 2018 when this party wasn't even represented in the parliament and municipalities. Unfortunately today there isn't a single political party in Latvia that I would consider donating to. 

```
Donations to Latvian political parties from year 2002 till 2024.
My ranking according to the donated amount.

         Person                    Party                    Amount (EUR)
------------------------------------------------------------------------
19951  Dāvis Vilcāns             Progresīvie                   10.00

```

