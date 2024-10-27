import { expect,test } from "@playwright/test";
import path  from "path";

const UI_URL="http://localhost:5173/"


test.beforeEach(async({ page })=>{
    await page.goto(UI_URL);
    
    //get the sign-in button
    await page.getByRole('link',{name: "Sign In"}).click();
  
    await expect(page.getByRole("heading", {name:"Sign In"})).toBeVisible();
  
    await page.locator("[name=email]").fill("vansh456patel@gmail.com");
    await page.locator("[name=password]").fill("Vansh@123");
    
    await page.getByRole("button",{name:"Login"}).click();
  
    await expect(page.getByText("Sign in Successful")).toBeVisible();

});

test("Should allow user to add a hotel", async ({ page }) => {
    await page.goto(`${UI_URL}add-hotel`);
    await page.locator("[name='name']").fill("Test Hotel");
    await page.locator("[name='city']").fill("Test City");
    await page.locator("[name='country']").fill("Test Country");
    await page.locator("[name='description']").fill("test description");
    await page.locator("[name='pricePerNight']").fill("1000");
    await page.selectOption('select[name="starRating"]',"3");
    await page.getByText("Budget").click();
    await page.getByLabel("Free Wifi").check();
    await page.getByLabel("Parking").check();
    await page.locator("[name='adultCount']").fill("5");
    await page.locator("[name='childCount']").fill("2");
    await page.setInputFiles('[name="imageFiles"]',[
        path.join(__dirname,"files","download.jpg"),
        path.join(__dirname,"files","images (1).jpg"),
        path.join(__dirname,"files","images.jpg")
    ]);
    await page.getByRole("button",{name:"Save"}).click();
    await expect(page.getByRole("button", {name:"Saving..."})).toBeVisible();
    await expect(page.getByText("Hotel Saved")).toBeVisible();

   




});