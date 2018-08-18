git pull
pm2 restart 0
set d=%date:~0,10%
set t=%time:~0,8%
echo %d% %t% > time.log