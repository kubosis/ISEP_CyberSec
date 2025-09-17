## Example directory of a challenge.

The directory should contain:
- source code in subdirectory src/
- README.md 
  - instructions for the user on how to start the challenge, what is it about
  - wether the challenge is EASY, MEDIUM, or HARD
- Dockerfile for easy deployment to the web infrastructure

- Potentially any other needed files (i.e. make for C code, requirements.txt & pyproject.toml for python etc.)
- The flag will be provided by dockercompose (in the main infrastructure). Just note that you can access the flag as an environmental variable called 'CTF\_FLAG'. For testing purposes, define a dummy flag in your own environment
------------------
Kubos 
