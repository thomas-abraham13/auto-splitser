// Script Name: Auto Splitser for Rent

const puppeteer = require('puppeteer');
const prompt = require("prompt-sync")();
require('dotenv').config();
const user = process.env.USER_NAME;
const pass = process.env.PASS_WORD;

module.exports.splitStuff = splitStuff;
async function splitStuff(thing,cost) {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({ headless: "new", args: ['--start-maximized','--incognito']});
    const page = await browser.newPage();
    console.log(await browser.userAgent());

    //Delay function
    function delay(time) {
	    return new Promise(function(resolve) { 
	    	setTimeout(resolve, time)
	    })
    };

    // Navigate to Splitser Lists
    await page.goto(`https://app.splitser.com/lists`, { waitUntil: 'networkidle0' });
    console.log("Navigation to splitser.com : SUCCESS");
    await delay(500);

    // Set screen size
    await page.setViewport({width: 1080, height: 1024});

    // Login to Splitser
    await page.type('#__next > div.content-app > div > div > form > div:nth-child(1) > div > input', user, {delay: 100}); // Enter Email
    console.log("Email : " + user);
    await page.type('#__next > div.content-app > div > div > form > div:nth-child(2) > div > input', pass, {delay: 100}); // Enter Password
    console.log("Password : " + pass);
    await page.click('#login-form-submit > button > div.WButton__CustomContainer-sc-1o64yp6-0.idKCuO'); // Click Selector for Login Button
    await page.waitForNavigation();
    console.log("Bot Logged In : SUCCESS");
    await delay(500);

    // Navigate to List 'Home'
    await page.click('#__next > div.content-app > div > div > div > div:nth-child(2) > div.WCard__CustomCard-sc-19l15c2-0.fjbWYi.ListCard__Container-sc-1hrd3an-6.fOfoyZ'); // Click Selector for Home List
    console.log("Navigated to List 'Home' : SUCCESS");
    await delay(500);

    // Navigate to Add Transaction Page
    await page.click('div.Fab__FabContainer-sc-ssaszv-2:nth-child(4) > div:nth-child(1)'); // Click Selector for Add Button
    await page.waitForNavigation();
    console.log("Navigated to 'Add Transaction' Page : SUCCESS");
    await delay(500);

    // To store the name of the next month in a variable
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const nextMonth = months[new Date().getMonth()+1];

    // Create Rent Entry
    await page.type('#transaction-calculator',cost, {delay: 100}); // Enter Rent Amount
    await page.select('.WMemberDropdown__SelectContainer-sc-1atdj3f-2', 'b8cc017f-70e3-4bee-bb90-a08acde56637'); // Select Thomas in the dropdown
    await page.type('#transaction-what-for', thing+' for '+nextMonth, {delay: 100}); // Enter Description
    await page.click('#__next > div.content-app > div.CreateUpdate__FullHeight-sc-1qhn6my-0.cjECzb > div.Page__BackgroundContainer-sc-7q8ic7-0.egZtgT > div > div.Participants__ParticipantsContainer-sc-az6kve-4.cVsIox > div.Participants__TitleContainer-sc-az6kve-0.ceWbIg > div.Participants__DesktopVisibleContainer-sc-az6kve-6.dogmGD > div > button > div.WButton__CustomContainer-sc-1o64yp6-0.idKCuO'); // Click Selector for Split Equally Button
    await page.click('#__next > div.content-app > div.CreateUpdate__FullHeight-sc-1qhn6my-0.cjECzb > div.Page__BackgroundContainer-sc-7q8ic7-0.egZtgT > div > div.Participants__ParticipantsContainer-sc-az6kve-4.cVsIox > div.WParticipants__Container-sc-nr3xs5-0.gXRUeD > div:nth-child(1) > div:nth-child(2) > div.WMultiplier__Container-sc-1yu5ib2-0.jWjfFR > div:nth-child(1) > div'); // Removes the Bot from the Transaction
    const doneButton = '#__next > div.content-app > div.CreateUpdate__FullHeight-sc-1qhn6my-0.cjECzb > div.CreateUpdate__ActionContainer-sc-1qhn6my-2.hREKlw > div.WButton__ButtonContainer-sc-1o64yp6-2.fhcjlX.CreateUpdate__WCustomDoneButton-sc-1qhn6my-5.fOAQnQ > button > div.WButton__CustomContainer-sc-1o64yp6-0.idKCuO'; // Selector for Done Button
    // Comment below line during tests to prevent a transaction being created
    await page.click(doneButton);
    console.log("Created Entry for "+ thing +" : SUCCESS");
    await delay(500);
    console.clear();

    await browser.close();

};

// Commented as function will be called directly in index.sh to make it easier to automate
// var inputThing = prompt("What are you paying for? ");
// var inputCost = prompt("How much did it cost? ");
// splitStuff(inputThing,inputCost);