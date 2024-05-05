# Bash script to run auto-splister for Rent & Internet

thing="Stuff"
cost="50"

echo "Running Auto-Splitser Script:"
node -e 'require("./index").splitStuff("'${thing}'","'${cost}'")'