<a href="https://codecov.io/gh/AKOvcharenko/rick-and-morty-explorer" >
<img src="https://codecov.io/gh/AKOvcharenko/rick-and-morty-explorer/branch/master/graph/badge.svg?token=IG6Z1HSD31"/>
</a>

# Rick and Morty Explorer

This application implements infinity scroll integrated with "Rick and Morty" GraphQL API.<br/>
It allows user to check cartoon's characters on CharactersList page and see more detailed information about selected person on CharacterPage.<br/>
Application keeps scroll state in url and cache data with @tanstack/react-query.<br/>
It also available as <b>akovcharenko/rick-and-morty</b> docker image in DockerHub.<br/>

### It build with:

- react 18.2.0,
- antd 5.6.1,
- @tanstack/react-query 4.29.13

### CI process orginized with GH Actions:

- code testing
- code linting
- application building
- docker image building and upload to DockerHub
