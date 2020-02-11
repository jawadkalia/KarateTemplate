- [Pre-requisite Software:](#pre-requisite-software)
- [Introduction](#introduction)
    - [Setting up Repository](#setting-up-repository)
    - [Add your own test!](#add-your-own-test)
    - [Run Tests using Maven](#run-tests-using-maven)
        - [Run Tests using docker-compose:](#run-tests-using-docker-compose)
- [Learn Karate! :writing_hand:](#learn-karate-writinghand)
- [FAQ](#faq)

# Pre-requisite Software:
Please check the [FAQ](#faq) section for troubleshooting
use ctrl+click on links

- Required
    - Karate requires Java 8 (at least version 1.8.0_112 or greater) and then either [Maven](https://maven.apache.org/install.html) or [Eclipse](https://www.eclipse.org/downloads/) to be installed. 
    - [Git](https://gitforwindows.org/) Installation 
    - [Docker](https://www.docker.com/get-started) installation
        - A nice [video intro](https://www.youtube.com/watch?v=S7NVloq0EBc) to docker concepts on windows
        - If you have a windows machine. please do the steps in this [blog](https://blogs.technet.microsoft.com/canitpro/2015/09/08/step-by-step-enabling-hyper-v-for-use-on-windows-10/) and then [download](https://store.docker.com/editions/community/docker-ce-desktop-windows) docker installer and run it. Also consider switching to a mac.

- Suggested
    - [SourceTree](https://product-downloads.atlassian.com/software/sourcetree/ga/Sourcetree_3.0_200.zip?_ga=2.13605623.1310353568.1540920405-56241059.1540920405) GIT GUI
    - [VSCode](https://code.visualstudio.com/download) text editor
    - [Cmdr](http://cmder.net/) command line emulation to run different type of terminals and shell on Windows and make it look cool!! it also allows you to use zShell
    - ZShell Command Autocompletion??:astonished:	https://github.com/zsh-users/zsh-autosuggestions
    

# Introduction


[**Karate**](https://github.com/intuit/karate) is a behaviour driven automated testing framework designed to test all kinds of web services using the Cucumber Gherkin Syntax.
Karate requires Java 8 (at least version 1.8.0_112 or greater) and then either Maven, Gradle or Eclipse to be installed.

[**Docker**](https://www.docker.com/) Is used to run the API tests either locally or in a CI/CD environment

[**Jenkins**](https://jenkins.io/) Is the CI/CD tool to run karate tests on a scheduled daily runs. With trend reporting. We will be using the Jenkins Pipeline Script to build our jobs. This a devops owned tool and therefore please contact your devops liasion for getting access and creating jobs.

## Setting up Repository
* Fork this repository
* Rename the 'myproject' directory according to project name
* Update [pom.xml](myproject/pom.xml) file using the comments in the file as guidelines.
* Update [karate-config.js](myproject/src/test/java/karate-config.js) using comments as guidelines. for documentation please click [here](https://github.com/intuit/karate#karate-configjs).
* Update [TestParallel.java](myproject/src/test/java/examples/TestParallel.java) file, using the comments in the file as guidelines.
* Update [docker-composeQA.yml](/docker-compose.yml) files accordingly, using the comments in the file as guidelines.
* Update [.gitignore](/.gitignore) files accordingly, using the comments in the file as guidelines

## Add your own test!
Please make sure to follow the [Folder Structure Guidlines](https://github.com/intuit/karate#folder-structure).

- Navigate to examples directory
- Create a new directory `posts`
    - Recommendation: Make a directory per endpoint
- Navigate to newly made directory
- Create a `PostsRunner.java` file
    - The DirectoryRunner.java file should have the following contents
  
        ```
        package examples.posts;
        import cucumber.api.CucumberOptions;
        import com.intuit.karate.junit4.Karate;
        import org.junit.runner.RunWith;

        @RunWith(Karate.class)
        @CucumberOptions(tags = {"@debug","~@ignore"})
        public class PostsRunner {} // please update the class name accordingly
        ```
        - Please note:
            - CucumberOptions allows you to run or not run specific tags. so in the above code it will run all files in the directory which has the `@debug` attached to it either on the Feature or Scenario
    - Create a Feature file `posts.feature`, with the following contents
  
        ```
        @debug // Since we want to run this feature file using the DirectoryRunner Test class
        Feature: Testing calls to posts endpoint

        Background: This is basically the area where you set up Test Data and declare variables that are available to every Scenario. The Background Section runs before every Scenario

        * url baseUrl // setting up the baseUrl for tests. please check karate-config.js file

        Scenario: Testing Get call to posts endpoint

            Given path 'posts'
            When Method GET
            Then status 200 // this is an assertion step as well

            // karate provides match keyword for Assertions
            Then match response[0].id == 1

        ```
    - Run the test
        - In your terminal type `mvn clean test -D test=PostsRunner`. The test will run using the karate's own built in runner class will give out a debugging html report in the console output
        - It is recommended to remove the `@debug` tag after completing scripting of a test

Congratulations! you have taken the first step towards Karate Automation Engineer :triumph:

## Run Tests using Maven

Open console in the `myproject` directory

To run all tests in a specific environment `mvn clean test -DargLine="-Dkarate.env=qa"` just change the karate.env value to the needed **environment**.

To run a specific test in a specific environment `mvn clean test -DargLine="-Dkarate.env=qa" -D test=dashboardrunner`

Default environment is qa therefore mvn clean test will run all tests in parallel in the QA env

and

`mvn clean test -D test=dashboardrunner` will run the specified suite in the QA env

Running all tests will generate a Pretty Html Report under the target directory.
Running single tests will generate a report. the path to which will be in the console output.

### Run Tests using docker-compose:

Docker provides us a way to run our tests anywhere, only requirment? Latest Version of Docker is installed!

A reference to the `docker-compose.yml` file syntax can be found [here](https://docs.docker.com/compose/compose-file/compose-file-v2/)

From your console `docker-compose -f docker-compose.yml up`

Docker is :cool:

# Learn Karate! :writing_hand:


* [Maven QuickStart For Karate](https://github.com/intuit/karate#quickstart)
* [Eclipse QuickStart For Karate](https://github.com/intuit/karate#eclipse-quickstart)
* [Hello World](https://github.com/intuit/karate#hello-world)
* [Real world Examples](https://github.com/intuit/karate/tree/master/karate-demo)

Must read Sections from the original karate documentation

* [Folder Structure](https://github.com/intuit/karate#folder-structure)
* [Naming Conventions](https://github.com/intuit/karate#naming-conventions)
* [Running Tests](https://github.com/intuit/karate#command-line)
* [Running Tests in Parallel](https://github.com/intuit/karate#parallel-execution)
* [Switch Environment Using Command Line](https://github.com/intuit/karate#switching-the-environment)
* [Karate Config File](https://github.com/intuit/karate#karate-configjs)
* [Script Structure](https://github.com/intuit/karate#script-structure)
* [Using Variables](https://github.com/intuit/karate#def)
* [Reading other Files e.g. Data Files or Json Files](https://github.com/intuit/karate#reading-files)
* [Request Headers](https://github.com/intuit/karate#managing-headers-ssl-timeouts-and-http-proxy)
* [Assertions](https://github.com/intuit/karate#match)
* [Manipulating Data](https://github.com/intuit/karate#set)
* [Fuzzy Matching](https://github.com/intuit/karate#fuzzy-matching)
* [Scenario Outline](https://github.com/intuit/karate#the-cucumber-way)

Karate uses Json-Path out of the box to retrieve, set, remove and replace data from a JSON. This [Document](https://github.com/json-path/JsonPath#path-examples) is good to learn jsonpath. And http://jsonpath.com/ to test your Json paths

# FAQ

* For docker-compose, getting error `Cannot create container for service karate`

In docker settings in shared drives section, make sure you have shared drive enabled. https://github.com/docker/for-win/issues/77#issuecomment-246778932

* Hyper-V errors when running Docker on windows follow [this](https://docs.microsoft.com/en-us/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v)

* Docker for Windows error: `Hardware assisted virtualization and data execution protection must be enabled in the BIOS` [solution](https://stackoverflow.com/questions/39684974/docker-for-windows-error-hardware-assisted-virtualization-and-data-execution-p/39989990)


Karate has a dedicated [TAG](https://stackoverflow.com/questions/tagged/karate) on Stack Overflow and you can reach out to me and my colleagues!

Authors Note:
Karate is developed by Peter Thomas. I recommend very strongly to go through the karate documentation and look the Karate Demo Examples. 


Enjoy!

[Jawad Kalia] :sunglasses:
