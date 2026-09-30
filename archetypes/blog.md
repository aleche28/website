---
title: "{{ replace (replaceRE `^\d{4}-\d{2}-` "" .File.ContentBaseName) "-" " " | title }}"
date: {{ .Date }}
draft: true
description: ""
tags: []
toc: false # true for long posts: lists the h2 and h3 headings
---

<!-- One-sentence takeaway. Then: problem → options considered → decision → what I'd do differently. -->
