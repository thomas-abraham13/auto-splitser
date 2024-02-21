// Script Name: Auto Splitser

const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    console.clear();
    const browser = await puppeteer.launch({ headless: 'true', args: ['--start-maximized','--headless']});
    const page = await browser.newPage();
    console.log(await browser.userAgent());

    //Delay function
    function delay(time) {
	    return new Promise(function(resolve) { 
	    	setTimeout(resolve, time)
	    })
    };

    // Navigate the page to a URL
    await page.goto(`https://splitser.com/`, { waitUntil: 'networkidle0' });
    console.log("Navigation to splitser.com : SUCCESS");

    // Set screen size
    await page.setViewport({width: 1080, height: 1024});

    // Navigate to Login Page
    const loginButton = 'body > div > header > div.row > div > nav > ul > li:nth-child(3) > a'; // Selector for Login Button
    await page.click(loginButton);
    await page.waitForNavigation();
    console.log("Navigate to Login Page : SUCCESS");

    // Login to Spliser
    await delay(2000);
    await page.type('#__next > div.content-app > div > div > form > div:nth-child(1) > div > input', 'thomasabraham832+rentbotsplitser@gmail.com', {delay: 100}); // Enter Email
    console.log("Email Entered : SUCCESS");
    await delay(2000);
    await page.type('#__next > div.content-app > div > div > form > div:nth-child(2) > div > input', 'RKmJVoQQBBcKqJ9oK4FF', {delay: 100}); // Enter Password
    console.log("Password Entered : SUCCESS");
    await delay(2000);
    const loginAction = '#login-form-submit > button > div.WButton__CustomContainer-sc-1o64yp6-0.idKCuO'; // Selector for Login Button
    await page.click(loginAction);
    await page.waitForNavigation();
    // console.log(location.href);
    console.log("Bot Logged In : SUCCESS");

    // Navigate to List 'Home'
    const homeList = '#__next > div.content-app > div > div > div > div:nth-child(2) > div.WCard__CustomCard-sc-19l15c2-0.fjbWYi.ListCard__Container-sc-1hrd3an-6.fOfoyZ > a > div.ListCard__TextContainer-sc-1hrd3an-8.jHcFln'; // Selector for Home List
    await page.click(homeList);
    await page.waitForNavigation();
    console.log("Navigated to List 'Home' : SUCCESS");

    // Navigate to Add Transaction Page
    const addButton = '#__next > div.content-app > div.ListDetails__TabsContainer-sc-oas1cn-0.gQpOAv > div > div > div.Fab__FabContainer-sc-ssaszv-2.fzyqca.WTabs__CustomFab-sc-1u78emt-3.FnYQm > div'; // Selector for Add Button
    await page.click(addButton);
    await page.waitForNavigation();
    console.log("Navigated to 'Add Transaction' Page : SUCCESS");

    // Create Rent Entry
    await page.type('#transaction-calculator','2100', {delay: 100}); // Enter Rent Amount
    const payerDropdown = '#transaction-member-dropdown > select'; // Selector for Payer Dropdown
    await payerDropdown.select('#transaction-member-dropdown > select > option:nth-child(4)'); // Select Thomas Abraham as Payer
    await page.type('#transaction-what-for', 'Rent for the Month', {delay: 100}); // Enter Description
    const splitButton = '#__next > div.content-app > div.CreateUpdate__FullHeight-sc-1qhn6my-0.cjECzb > div.Page__BackgroundContainer-sc-7q8ic7-0.egZtgT > div > div.Participants__ParticipantsContainer-sc-az6kve-4.cVsIox > div.Participants__TitleContainer-sc-az6kve-0.ceWbIg > div.Participants__DesktopVisibleContainer-sc-az6kve-6.dogmGD > div > button > div.WButton__CustomContainer-sc-1o64yp6-0.idKCuO'; // Selector for Split Equally Button
    await page.click(splitButton);
    const rentBotRemove = '#__next > div.content-app > div.CreateUpdate__FullHeight-sc-1qhn6my-0.cjECzb > div.Page__BackgroundContainer-sc-7q8ic7-0.egZtgT > div > div.Participants__ParticipantsContainer-sc-az6kve-4.cVsIox > div.WParticipants__Container-sc-nr3xs5-0.gXRUeD > div:nth-child(1) > div:nth-child(2) > div.WMultiplier__Container-sc-1yu5ib2-0.jWjfFR > div:nth-child(1) > div'; // Selector for Minus Button
    await page.click(rentBotRemove);
    const doneButton = '#__next > div.content-app > div.CreateUpdate__FullHeight-sc-1qhn6my-0.cjECzb > div.CreateUpdate__ActionContainer-sc-1qhn6my-2.hREKlw > div.WButton__ButtonContainer-sc-1o64yp6-2.fhcjlX.CreateUpdate__WCustomDoneButton-sc-1qhn6my-5.fOAQnQ > button > div.WButton__CustomContainer-sc-1o64yp6-0.idKCuO'; // Selector for Done Button
    await page.click(doneButton);
    await page.waitForNavigation();
    console.log("Created Entry for Rent : SUCCESS");

    await browser.close();

})();