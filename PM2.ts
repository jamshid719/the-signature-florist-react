/*
  PM2 COMMANDS:

  pm2 ls
  pm2 list
  pm2 status

  EXPRESS BACKEND:

  npm install
  npm run build
  pm2 start dist/server.js --name=TSFlorist

 YOKI,
 
 EXPRESS start:prod bilan:

  pm2 start npm --name TSFlorist -- run start:prod 

  react: 
  pm2 start yarn.cmd --name TSFlorist-REACT --interpreter none -- run start:prod
  
pm2 stop id (0)
pm2 delete id
pm2 restart id
pm2 monit (real time monitoring qilish -loglar, metadatalar... hk kuriw)
pm2 logs id
pm2 kill


=============================================

  REACT FRONTEND:

  npm install
  npm run build
  pm2 serve build 3000 --spa --name=react-frontend

  VITE REACT:

  npm install
  npm run build
  pm2 serve dist 3000 --spa --name=react-frontend

  RESTART:

  pm2 restart express-backend
  pm2 restart react-frontend
  pm2 restart all

  LOGS:

  pm2 logs
  pm2 logs express-backend
  pm2 logs react-frontend

  STOP:

  pm2 stop express-backend
  pm2 stop react-frontend
  pm2 stop all

  DELETE:

  pm2 delete express-backend
  pm2 delete react-frontend
  pm2 delete all

  AUTO START AFTER SERVER REBOOT:

  pm2 save
  pm2 startup
  pm2 save
*/
