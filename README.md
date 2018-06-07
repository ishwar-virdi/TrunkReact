# TRUNK Smart Reconcile (React/Frontend)
We have used for [IntelliJ IDEA](https://www.jetbrains.com/idea/download/) for our development.
## Steps to setup local development environment
1. Clone the repository using the following command in any directory (Eg: /home/ABC/Workspaces/IntelliJ/)
```console
git clone https://github.com/ishwarvirdi/TrunkReact.git
```
2. Start IntelliJ IDEA and select **Open** option at the startup.
3. Select the TrunkReact folder created from the git clone (/home/ABC/Workspaces/IntelliJ/TrunkReact).
4. Click OK.
5. Do an **npm install** to install all packages/dependencies. Once complete, your local IDE setup is ready.
## If you want to Run Locally and Not Heroku & AWS
1. Open the **constants.js** file under **src/config**.
2. Comment the below lines which points to the Heroku backend and URL to itself,
```
const apiurl = "https://trunksmartreconcilespring.herokuapp.com";
const selfurl = "https://trunksmartreconcilereact.herokuapp.com";
```
3. Uncomment the below line which points to the local system backend and URL to itself,
```
const apiurl = "http://localhost:8080";
const selfurl = "http://localhost:3000";
```
4. Do an **npm start** to run the project locally.
