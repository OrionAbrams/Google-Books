# Google books Search
  An app to search for google books and save and delete the ones you want.

# Challenges
  I had a few challenges here, and could not get everything quite working perfectly as of yet. The main issue was beginning to do the project without setting up React Router Dom, and therefore making it very difficult to show everything on one page. Ideally I could have just had a "saved" page where I could click on a link in navbar to get to, but having all the components go through App made it diffucult to do that. I ended up only being able to show the user all the things from the saved collection when they actually saved something (but at least they can't save the same item twice). To somewhat compensate for this, I added a "delete all saved" button at the very bottom of every page.

  Searching books is nice, but missing other ways to reach the saved books besides clicking on something new to save takes a lot away from the app.

  The hardest challenges besides poor routing structure were all to do with collecting the right info from the Google Books API and also putting it into a mongo database. It was more a matter of being very new to mongo and missing some little things like a bracket position or a misspelled word than anything, but it was still a good experience.

  The most satisfying challenge was when I realized the app crashes when mongo tries to update an image with 'undefined', and some of the Google Books API results come back without images. I thought to simply make a loop and check for images not being there like !images and skip over the ones that aren't there and continuing the loop. A simple fix, but I was surprised and happy that I could come up with something like that on my own having never seen it before, given my newness to programming.

# Live app
  [a link](https://google-books-react-orion.herokuapp.com/)
