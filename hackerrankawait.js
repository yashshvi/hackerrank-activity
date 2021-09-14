// function mai hi result ata hai

let puppeteer=  require('puppeteer');
const { answer } = require("./codes");
let BrowserStartPromise=puppeteer.launch({
    headless:false,
    defaultViewport:null,
    args: ["--start-maximized","--disable-notifications"]
})
const loginLink = "https://www.hackerrank.com/auth/login";
let page,browser,lastele;
(async function fn(){
        try{
          let browserobj=await BrowserStartPromise;
          console.log("browser open");
          browser=browserobj;
          page=await browserobj.newPage();
          await page.goto(loginLink);
        //   console.log("browser open");
          await page.type(".ui-tooltip-wrapper #input-1","jenegis558@mi166.com");
          await page.type(".ui-tooltip-wrapper #input-2","yashshvi");
          await page.keyboard.press('Enter');
          await waitAndClick("a[data-attr1='algorithms']",page);
          await waitAndClick("input[value='warmup']",page);
       
            // await page.waitFor(3000);
            await page.waitForTimeout(4000)
            let questionsArr = await page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled"
                , { delay: 100 });
            for (let i = 0; i < questionsArr.length; i++) {
                await QuestionWillSolve(page, questionsArr[i], answer[i]);
            }
        }catch (err) {
            console.log(err);
        }
})();
// jenegis558@mi166.com

function waitAndClick(selector,cpage){
    return new Promise(function(resolve,reject){
        let WaitPromise=cpage.waitForSelector(selector,{visible:true});
        WaitPromise.then(function(){
            let clickPromise=cpage.click(selector,{delay:20});
            return clickPromise
        }).then(function(){
            resolve();
        }).catch(function(){
            reject();
        })
    })
}
function QuestionWillSolve(page,question,answer){
    console.log("function call");
    return new Promise(function(resolve,reject){
        let QwillClickPromise=question.click();
        QwillClickPromise.then(function(){
            let waitForEditortoFocus=waitAndClick(".monaco-editor.no-user-select.vs",page);
            return waitForEditortoFocus;
        }).then(function(){
            let TestInput=waitAndClick(".checkbox-input",page);
            return TestInput;
        }).then(function(){
            let WaitForTextArea=page.waitForSelector(".input.text-area.custominput.auto-width",{visible:true});
                  return WaitForTextArea;
        }).then(function(){
            return page.type(".input.text-area.custominput.auto-width",answer,{delay:50});
        })
        .then(function(){
            let ctrPress=page.keyboard.down("Control");
            return ctrPress;
        }).then(function(){
            let Apress=page.keyboard.press("A",{delay:50});
            return Apress;
        }).then(function(){
            return page.keyboard.press("X",{delay:50});
        }).then(function(){
            let crtlPressP=page.keyboard.up("Control");
            return crtlPressP
        }).then(function(){
            let waitForEditortoFocus=waitAndClick(".monaco-editor.no-user-select.vs",page);
            return waitForEditortoFocus;
        }).then(function(){
            let ctrPress=page.keyboard.down("Control");
            return ctrPress;
        }).then(function(){
            let Apress=page.keyboard.press("A",{delay:50});
            return Apress;
        }).then(function(){
            return page.keyboard.press("v",{delay:50});
        }).then(function(){
            let crtlPressP=page.keyboard.up("Control");
            return crtlPressP
        }).then(function () {
            return page.click(".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled", { delay: 50 });
        })
       .then(function(){
            resolve();
        }).catch(function(err){
            reject(err);
        })
    })
}

