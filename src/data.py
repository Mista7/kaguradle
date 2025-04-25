import re
import json
import requests
from bs4 import BeautifulSoup


#setup
url = "https://kagurabachi.fandom.com/wiki/List_of_Characters"
headers = {"User-Agent": "Mozilla/5.0"}
response = requests.get(url, headers=headers)
soup = BeautifulSoup(response.text, "lxml")



#finds all character images
allLinks = soup.find_all("a", class_ = lambda className: className and "link-internal" in className)


name_link_img = []
#gets the names of all charNames and add to the list and also gets the img links for the characters
[name_link_img.append([i.parent.get("id").replace("_"," "), i.get("href"), i.find("img").get("src")]) for i in allLinks if i.parent.get("id")!= "List_of_Characters-Minor"]

charNames = [i[0] for i in name_link_img]

#getting all the info of the charNames
link = "https://kagurabachi.fandom.com"
charLinks = [i[1] for i in name_link_img]
characterFullInfo = {}

# get all information and put it into characterFullInfo
for i in range(len(charLinks)):
    currentCharLink = link+charLinks[i]
    reply = requests.get(currentCharLink, headers=headers)

    char = BeautifulSoup(reply.text, "lxml")

    section = char.find("aside", class_= lambda c:c and "portable-infobox" in c)



    #checks if the character has an alliance
    allianceElement = section.find("div", attrs={"data-source": "affiliation"})

    preAlliance = section.find("div", attrs={"data-source": "preaffiliation"})

    if not allianceElement and not preAlliance:
        alliance = "None"
    else:
        if allianceElement:
            alliances = allianceElement.find_all("a")
            alliance = [j.get("title") for j in alliances] 
        else:
            alliances = preAlliance.find_all("a")
            alliance = [j.get("title") for j in alliances] 



    # check for gender
    gender = section.find("span", typeof = "mw:File")  #this gets the span with the male/female symbol
    gender = gender.parent.get_text()    #get the text from the div which the symbol is in


    # check for age
    try:
        age = section.find("div", attrs={"data-source": "age"}).find("div").get_text()
        
        if len(age) != 2:
            if "[2]" in age:
                index = age.index("]")
                age = age[index+1:index+3]
            if "[1]" in age:
                nums = re.findall(r'\d+', age)
                age = f">{nums[0]}"

    except:
        age = "Unknown"



    # check for hair color
    try:
        hair = section.find("div", attrs={"data-source": "hair"}).find("div").get_text()
        
    except:
        hair = "Unknown"
    
    # check for eye color
    try:
        eyes = section.find("div", attrs={"data-source": "eyes"}).find("div").get_text()
        
    except:
        eyes = "Unknown"


    # gets the img link for character
    img = name_link_img[i][2]


    # gets debut chapter to find first arc
    debut = section.find("div", attrs={"data-source": "mangadebut"}).find("a").get("title")[-2::].replace(" ", "")

    arcLink = f"https://kagurabachi.fandom.com/wiki/Chapter_{debut}"
    response = requests.get(arcLink, headers=headers)
    arcPage = BeautifulSoup(response.text, "lxml")

    arcSection = arcPage.find("aside", lambda c:c and "portable-infobox" in c)

    firstArc = arcSection.find("div", attrs={"data-source": "arc"}).find("div").get_text()


    characterFullInfo[charNames[i]] = {"alliance":alliance, "gender": gender, "age": age, "hair": hair, "eyes": eyes, "img" : img, "debut": debut, 'firstArc': firstArc}





# print(characterFullInfo)

# sends the dictionary to json file for react

# with open("characterInfo.json", "w", encoding="utf-8") as f:
#     json.dump(characterFullInfo, f, indent=2, ensure_ascii=False)