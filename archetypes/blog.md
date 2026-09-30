---
title: "{{ replace (replaceRE `^\d{4}-\d{2}-` "" .File.ContentBaseName) "-" " " | title }}"
date: {{ .Date }}
draft: true
description: ""
tags: []
---

<!-- One-sentence takeaway. Then: problem → options considered → decision → what I'd do differently. -->
