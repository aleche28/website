---
title: B-AROL-O Team
description: Open-source robotics and AI projects built with an independent team, mostly for hackathons.
weight: 20
status: Finished hackathon projects
stack: [Python, ROS 2, OpenAI Whisper, Arduino, Vertex AI]
links:
  - name: B-AROL-O on GitHub
    url: https://github.com/B-AROL-O
---

B-AROL-O is an independent open-source team that builds robotics and AI projects, often for hackathons, and names them after Piedmontese wines. These are the projects I contributed to.

## FREISA and FREISA-GPT

**FREISA** (Four-legged Robot Ensuring Intelligent Sprinkler Automation) is a four-legged robot for automated plant watering, winner of the **Grand Prize of the OpenCV AI Competition 2023**.

In 2025 the team turned it into **FREISA-GPT** for the OpenAI Open Model Hackathon: a robot assistant driven by the open-weight gpt-oss-20b model. I worked on FREISA-GPT: I integrated **OpenAI Whisper** to turn voice commands into prompts for the model, and built the API behind the robot's "puppy state", which drives its expressions and sounds.

[Source on GitHub](https://github.com/B-AROL-O/FREISA) · [FREISA-GPT on Devpost](https://devpost.com/software/todo-hsifwn) · [FREISA-GPT demo](https://www.youtube.com/watch?v=cWYLJE8ZgHk) · [2023 write-up on Hackster.io](https://www.hackster.io/projects/845012)

## RUCHE

**ROS2-based Unified Control for Hugging-face Embodied-agents**: a chatbot that controls one or more robots through natural language instead of low-level commands. Built with ROS 2 and MCP for the MCP 1st Birthday hackathon in 2025.

I developed the command handling and motion logic for an Arduino UNO robot car.

[Source on GitHub](https://github.com/B-AROL-O/RUCHE)

## Agenthon 2026

A full advertising campaign for a Turin bakery's breadsticks, produced in one working day with generative AI, for Track 2 (GenAI for marketing) of the GDG Torino "Build with AI" Agenthon, November 2026.

I made the static visuals: the social set, the web and print ads, and the hero ad. I wrote a small Python CLI with Claude Code that sends a prompt to Nano Banana 2 on Vertex AI, then worked through Claude Code itself: I described each image, and it generated the image, checked it against the brief and iterated on my corrections. Logo and copy were never generated: they come from the official brand files.

[Source on GitHub](https://github.com/B-AROL-O/agenthon-2026) · [Write-up by Gianpaolo Macario](https://blog.gmacario.it/posts/2026-11-22-agenthon-2026-si-divide-si-condivide/)
