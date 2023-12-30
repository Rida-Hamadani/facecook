You can view the live website at: https://facecookwalter.netlify.app/

To start it locally, open main folder in two terminals, enter in the first:
```
cd client
npm install
npm start
```
In the second enter:
```
cd server
php -S localhost:8888 -t public
```
Note that databases are not included in the repo, you have to create them locally.
You might need to edit `server/include/config.php` in order to connect your database.
