# When I Was Your Age...
### *a.k.a. the Dad-est app ever*

created by Kaley Sullivan and Chandra Galbiati


__History:__
The idea for this app came from my father, who wanted to build a model that would allow you to see what the world was like at various points in another person's timeline.  What music was MLK Jr. listening to when he was 15? What current events shaped John Lennon's young life? What sporting events did Andy Warhol watch as a child? Did Grandma *really* walk uphill to school both ways?

__Notes:__
  * Currently, only "world events" are represented in the app (other categories would be included in a 1.0). These "world events" were scraped from [Wikipedia's "Year" pages](https://en.wikipedia.org/wiki/List_of_years). Though Wikipedia does offer an API and full downloads of its content, we were interested in learning web-scraping, and Wikipedia offered a simple way to explore the techniques.
  * On the front end, requests are made to the database only when the dates of the timeline are changed through the form in the top-right corner, increasing the performance of the slider and the changing display.

  


v 0.5 documentation
-------------------
Events must be scraped into a local Postgres database in order for the app to function.

__Set-up__
  1. Create a new [Postgres](http://postgresapp.com/) database. 
  2. In database.js, edit the first 2 lines to point to your database and username
  3. Keep the database running as long as you want to use the app.
  
__In-Browser Database API__
  * Add data to the database by making a scraping request:
    
    ```
    http://localhost:5000/api/post/range/YYYY/ZZZZ
    ```
    
    * *YYYY = first year in range, ZZZZ = last year in range, inclusive*
    * For recent years (~1980s and later) we recommend limiting the range to ~5 years at a time, as the asynchronous requests may fail because of the volume of data.
    
  * Request data from a single year: 
  
    ```
    http://localhost:5000/api/year/YYYY
    ```
    
  * Request data from a range of years, and a specific number of events per year:
    ```
    http://localhost:5000/api/range?min=YYYY&max=ZZZZ&perYear=N
    ```
      * *YYYY = first year in range, ZZZZ = last year in range, inclusive, N = number of events per year*
    
__Using the App__
  * Once there's data in the database, you can use the form in the top-right corner to change the timeline.
  * Move the slider to move through the person's timeline and see the top 5 events from that year.
  * Use the "See More Events" button to randomize and see more events from that year.
  * Enjoy learning about the world through someone else's eyes!






