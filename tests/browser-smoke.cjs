/* Run with a local starter HTTP server, installed Playwright and Chromium:
   node tests/browser-smoke.cjs http://127.0.0.1:8000
   Optional SCREENSHOT_PATH saves a mobile screenshot outside the package. */
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
(async () => {
  const base = process.argv[2] || 'http://127.0.0.1:8000';
  assert.ok(/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?\/?$/.test(base), 'Use a local isolated preview only');
  const browser = await chromium.launch({headless: true, ...(process.env.BROWSER_CHANNEL ? {channel:process.env.BROWSER_CHANNEL} : {})});
  try {
    const page = await browser.newPage({viewport:{width:1280,height:900}});
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    let downloads=0;page.on('download',()=>downloads++);
    await page.goto(base);await page.locator('.card').first().waitFor();
    assert.equal(await page.locator('.card').count(),3);
    await page.locator('.card-photo').first().click();
    await page.getByRole('heading',{name:'Example Product A',exact:true}).waitFor();
    assert.equal(await page.locator('tbody tr').count(),5);
    await page.getByRole('button',{name:'Next',exact:true}).click();
    assert.equal(await page.locator('tbody tr').count(),1);
    await page.getByRole('searchbox').fill('EX-A03');
    assert.equal(await page.locator('tbody tr').count(),1);
    assert.ok((await page.locator('tbody').textContent()).includes('DEMO-03'));
    const before=page.url();await page.getByRole('button',{name:'Enlarge photo',exact:true}).click();
    assert.equal(await page.locator('dialog').evaluate(n=>n.open),true);
    await page.keyboard.press('Escape');
    assert.equal(page.url(),before);assert.equal(downloads,0);
    assert.equal(await page.getByRole('button',{name:'Enlarge photo',exact:true}).evaluate(n=>n===document.activeElement),true);
    await page.locator('#language').selectOption('es');
    assert.equal(await page.locator('html').getAttribute('lang'),'es');
    await page.reload();await page.getByRole('heading',{name:'Modelos del producto',exact:true}).waitFor();
    await page.goto(`${base}/?product=sample-b&lang=es`);
    await page.getByText('Modelos pendientes de confirmación.',{exact:true}).waitFor();
    await page.goto(`${base}/?product=missing&lang=en`);
    await page.getByRole('heading',{name:'Product not found.',exact:true}).waitFor();
    await page.setViewportSize({width:390,height:844});
    await page.goto(`${base}/?lang=es`);await page.locator('.card').first().waitFor();
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
    if(process.env.SCREENSHOT_PATH)await page.screenshot({path:process.env.SCREENSHOT_PATH,fullPage:true});
    assert.deepEqual(errors,[]);
    console.log('PASS: product navigation, exact models, pagination/search, no-download preview, focus return, locale reload, empty/unknown product, mobile overflow.');
  } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
