#set document(title: [ATAG Research Report])

#title("ATAG Research Report")

#show link: underline

#outline()

= Introduction

Authoring Tool Accessibility Guidelines (ATAG) 2.0 is a 2015 World Wide Web Consortium (W3C) Recommendation which "provides guidelines for designing web content authoring tools that are both more accessible to authors with disabilities … and designed to enable, support, and promote the production of more accessible web content by all authors" @atag. Since the publication of the ATAG 2.0 Recommendation, the advent of Generative Artificial Intelligence (AI) and its integration into authoring environments has significantly altered the experience and process of authoring web content.

In this research report, we aim to assess the impact and opportunities of these technologies for the existing principles and guidelines of ATAG 2.0, and provide recommendations

= Research Insights by ATAG Requirement

== A. Make the Authoring tool user interface accessible

=== Principle A.1: Authoring tool user interfaces follow applicable accessibility guidelines

As Generative AI is increasingly integrated into authoring tools, new accessibility issues may be introduced by the Generative AI tools themselves @atag @atag-2026-05-22 @atag-2026-06-19. A blind developer identified multiple issues with the web-based interface to Anthropic’s Claude Generative AI tool which prevented them from using screen readers to interact with the tool @ok-top-3337_blind_2025. Blind and low-vision developers also identified issues with the category of Generative AI coding assistants, within the realms of content switching, control and predictability, and cognitive overload caused by the volume of output @flores-saviaga_impact_2025. As “current interfaces rely mostly on visual-only indicators… real-time status updates, clear explanations of outputs, and accessible methods for users to verify, understand, and act upon AI-generated results” will be critical to the accessibility of Generative AI-based authoring tools @chen_screen_2025. One specific accessibility barrier that blind and low-vision users identified with Generative AI tools is keyboard accessibility, specifically scenarios where “shortcuts conflicted with their established keyboard habits” such as “up and down arrow keys in the input box—rather than moving between lines in a multiline-prompt, these keys cycled through previous commands, often without users realizing it” @chen_screen_2025. The use of “consistent and predictable keyboard shortcuts” can help to “[address] participants’ difficulties with unintended actions that disrupt their workflow” @chen_screen_2025.

In addition to baseline accessibility of authoring tool interfaces following WCAG @wcag principles, the unique characteristics of natural language interfaces underscore the need to “[position] accessibility… as a fundamental requirement in their design and usage” when Generative AI interfaces are part of an authoring tool @abu_doush_can_2025. The W3C’s Natural Language Interface Accessibility User Requirements identify several “cognitively taxing” aspects of natural language interfaces, highlighting the need to quickly call “[speech] input commands… to mind”, to closely observe results “to make sure that the computer has not made a wording mistake”, and to use “the language centre of the brain… [for both] speech input… [and] many of the thought processes that go into things people do on computers such as writing or coding” @naur. As natural language interfaces are integrated into authoring tools, adoption of the Natural Language Interface Accessibility User Requirements will be critical to ensure that accessibility is not compromised.

Other research identifies “metacognitive” demands of Generative AI interfaces, such as the “open-endedness of many current prompting interfaces [which] requires users to have self-awareness of their specific task goals, and be able to decompose their tasks into smaller sub-tasks so as to verbalize these as effective prompts” @tankelevitch_metacognitive_2024. Additionally, authoring tools which integrate natural language interfaces must support multimodal input and output mechanisms to support a wide range of user needs, and should also ensure that input and output mechanisms can be combined according to user requirements, so that, for example, “[a] user who is deaf or hard of hearing… [can] provide speech input to an application, while having the output presented as text” @naur.

=== Principle A.2: Editing-views are perceivable

If Generative AI-based authoring tools work with non-text content, it’s essential that they programmatically associate user-supplied text alternatives with that content in the editing view @atag-2026-05-22. It may also be possible for Generative AI-based authoring tools to generate text alternatives for content where the author has not provided them @conversational_ai.

Another factor to consider is when Generative AI is used to create non-text content such as pictures or videos. For blind or low vision authors, they may be able to provide and/or read the generated text alternatives; however, they may not be able to perceive the actual generated content. A suggestion for this is to have AI act as an intermediary that can describe the generated content to the author .

=== Principle A.3. Editing-views are operable

Generative AI tools can potentially be integrated into authoring tools in such a way as to make the editing views more operable @atag-2026-05-22. For example, section A.3.4 of ATAG suggests that the content structure should be adapted to enhance navigation, for example, to facilitate navigation by structure @atag. This sort of functionality must currently be built into the authoring tool, but a Generative AI agent with access to the content could create and update a table of contents which would facilitate such operability.

Generative AI-enabled authoring tools should support the ability of authors to “personalize the interface according to their needs” @chen_screen_2025 (see points under Principle A.1 about multi-modal interface options, keyboard customization etc.).

=== Principle A.4. Editing-views are understandable

The use of “streamlined and predictable interaction patterns” will be essential in the design of Generative AI-assisted authoring tools @chen_screen_2025.

Providing “accessible change tracking, including textual or audio cues for the scope (e.g., number of edits), context (e.g., location and status of code blocks), and content (e.g., what was modified)” @chen_screen_2025 will be critical to ensure that Generative AI-based authoring tools conform to the existing A.4.1 guidelines related to avoiding and correcting mistakes during the authoring process @atag-2026-05-22.

When website builders provide accessibility features and documentation, they aren’t always easily discoverable. As website builders are aimed at novice users, they should actively promote their accessibility features and provide guidance on how to use them through “personalized and accessible learning pathways” @chen_screen_2025. Furthermore, the user should be suggested ways to improve the accessibility of their work during their authoring sessions in a manner that is obvious and relevant to the content that they are currently authoring @pillai_website_2022.

Documentation of authoring tools which incorporate Generative AI will need to include detailed guidance on how to use those tools effectively to produce accessible content. Research has found “several differences in WCAG compliance between accessibility-oriented and accessibility-agnostic prompts, highlighting the importance of explicit accessibility guidance” @gurita_breaking_2025.

== B. Support the production of accessible content

=== Principle B.1. Fully automatic processes produce accessible content

Generative AI tools such as ChatGPT can generate websites; however, they do not tend to produce accessible websites by default nor perfectly compliant sites even with explicit accessibility guidance @chen_screen_2025, @atag, @atag-2025-12-05. This is likely due in part to lack of training on compliant code; as simpler and more common representations of accessible interfaces (e.g. checkboxes, tables) are more often generated correctly5. Some of the accessibility issues that may be produced include lack of contrast, improper labelling or text information, even non-unique IDs. While the model can be instructed to modify or correct its output, due to the limitations in training, it often can still not completely address all issues @palmer_constructing_2025. To improve Generative AI output, a foundation prompt or context can be provided to include more detailed instructions about producing accessible code and markup @atag-2025-12-05. However, even with this in place the Generative AI may still require follow up prompts to correct missing, or incorrectly generated output @doush_evaluating_2025. It is also important to note that the Generative AI results tend to decline as requests become more complex or ambiguous @gurita_breaking_2025.

With Generative AI models, we often do not know what data the models were trained on, nor how they may have been finetuned in the applications they are embedded in. For authoring tools with integrated Generative AI, it may not be known if there are already foundation prompts/context or templates that are being used which may affect the accessibility of the generated content @gurita_breaking_2025.

A deeper look into the failure of Generative AI to consistently produce accessible output suggests this occurs because semantic HTML and ARIA are underrepresented in the training data, AI output is predominantly assessed visually rather than on semantics, it takes fewer tokens to write inaccessible markup, and AI models don’t understand the accessibility tree. The following steps can be taken to mitigate these issues @pillai_website_2022:

- Provide prompts, preferably in the foundation/context, about accessibility and creating accessible code/markup
- Provide detailed follow up prompts for correction as needed
- Rather than allowing the Generative AI to produce any output, have it produce output making use of of existing libraries that already take accessibility into consideration
  - More than just learning from a single compliant library, the Generative AI models should learn from a diverse set of meaningfully accessible implementations @gurita_breaking_2025 [CHECK]
- Perform automated and manual testing of the output
  - Ask the AI to audit the code/markup based on WCAG
  - Perform manual testing; possibly comparing to examplars @gurita_breaking_2025
    - Not all issues can be found with automated testing alone. In some case poorly generated content may mask their inaccessibility from an automated testing tool. For example, content that is styled to look like a button but isn’t actually interactive, ambiguous alt-text and descriptions, navigation issues, and etc @leedy_accessibility_2025.
- Use a static analysis tool to look for issues with the generated code/markup
- Run automated tests in real browsers with a tool that can perform accessibility testing/audits on the rendered output
- In addition to running automated tests during development, run them in CI (continuous integration) to catch errors before changes are added

However, it’s important to remember that compliant doesn’t necessarily mean accessible. Even if a Generative AI tool is able to produce WCAG compliant output, it may not be accessible to all users @atag-2026-08-07. Evaluation should not just rely on compliance but on their ability to produce meaningful accessible outcomes @chen_screen_2025 @gurita_breaking_2025. Human expertise is a critical component for identifying and remediating accessibility issues @palmer_constructing_2025.

Some research has explored attempting to generate intentionally inaccessible interfaces through Generative AI. While the Generative AI-based tools would refuse, the output often still contained similar accessibility issues as attempts to create accessible interfaces. It appears that the Generative AI-base tools are locked into following patterns for their output, even if guardrails are in place to limit the prompts to them. This has further implications to both creative expression and inclusive design in general. If existing design patterns are so strictly adhered to, it will limit new designs from emerging; not to mention a lock in to a specific definition of what good design is; which may not be applicable in all contexts @palmer_constructing_2025.

Another approach that Generative AI can strive for is to produce semantically accessible content, rather than trying to replicate the visual surface of compliant interfaces @atag-2026-05-08. This would require the Generative AI to be capable of understanding the relational, labelling and navigational principles that make an interface usable and comprehensible for people with disabilities @patel_exploring_2025.

Section 11.8.3 of CAN/ASC - EN 301 549:2024 Accessibility requirements for ICT products and services (EN 301 549:2021, IDT) specification requires that "[if] the authoring tool provides restructuring transformations or re-coding transformations, then accessibility information shall be preserved in the output if equivalent mechanisms exist in the content technology of the output" @canasc.

=== Principle B.2. Authors are supported in producing accessible content

Even the most popular website builders, such as Wix and Squarespace, will default to using the file name or image caption as an image’s alt text @conversational_ai.

Website builders are marketed to support fast and easy, often with no code, solutions for creating a website. However, they may provide little to no support for facilitating accessibility features/requirements. For example, limited or no ability to set alt text on images or properly style headings @palmer_constructing_2025.

Generic and irrelevant strings may pass automated accessibility checks, but fail to provide the required semantic meaning to users. An approach to flag these cases involves using Generative AI-based tools to assess the semantic relevance @atag-2026-07-31. This process should capture most generic strings. However, it is more complex to make these determinations when an understanding of the surrounding context is required @calo_measuring_2026.

For authors without knowledge and experience with web accessibility, using Generative AI-based coding tools often does not provide any improvements in the accessibility of the created content. Authors will often focus on increased productivity and may not be aware of necessary accessibility consideration. Even in cases where the AI tool may suggest accessibility related improvements, the authors may still overlook these if they do not understand the requirement or purpose. A solution would tackle both aspects of improving Generative AI models to produce accessible content by default, and to guide/teach authors about accessibility practices and principles. One option for the latter would be a more guided approach at authoring with an interactive process for implementing accessible content. In this way the author is taught about accessibility as they author @mowar_tab_2024. When Generative AI-based tools are used, they should “proactively seek clarification by asking [authors] to specify their intent” to support the author’s learning process @chen_screen_2025. In addition to this, accessibility wizards could be included into the tool to provide a review stage where the generated content is audited with opportunities to explain access issues to the author and provide an interactive approach for remediating the content @atag-2025-12-05.

Research with student developers found that they often didn’t fully trust the AI coding assistant and felt the need to review suggestions. There was a feeling that the suggestions could need refinement or could even be completely wrong. Trust increases when the suggestions are accompanied by “references, explanations, or evidence” based on credible sources and guidelines (e.g. WCAG) @chen_screen_2025. In addition to providing a reference this is also an opportunity to educate the author about accessibility principles and practices. However, the context is still important and currently AI coding tools do not always take into consideration the design nuances or user experience. They also tend to imitate or follow the author’s existing code over following best practices for accessible implementations @patel_exploring_2025.

Generative AI coding assistants shift the author’s workflow from generating content to evaluating it. An author’s self-confidence and ability in evaluating generated content is dependent on their level of domain and AI knowledge/expertise, the Generative AI model’s consistency and quality of output, and even the amount to be evaluated or reviewed. For novice authors knowing how and what to evaluate, as well as how to remediate the issues can be a challenge. This is exasperated by large quantities of content output and even large or complex suggestions from the AI model. The non-deterministic nature of Generative AI can introduce unexpected or erroneous output that may not be easy to detect, even for experienced authors. This problem can be compounded with multiple iterations through Generative AI if the output does not align with previous content. In addition to developing more domain knowledge, even experienced authors will need to develop new strategies for working with AI generated content @tankelevitch_metacognitive_2024 @aljedaani_does_2024.

Built-in WCAG checking should run automatically against each generated output, flagging specific violations by criterion number, severity, and the elements that caused them as surfacing the problem to authors often cannot recognize it on their own. Where the tool would otherwise produce non-compliant output, it should warn the designer or refuse, rather than silently generating an interface that looks plausible but fails on accessibility; and where corrective iteration is needed, the interface should support structured component-level refinement rather than forcing authors back into an ad-hoc chat loop and hoping the Generative AI model focuses on the right place @gurita_breaking_2025.

Section 11.8.2 of CAN/ASC - EN 301 549:2024 Accessibility requirements for ICT products and services (EN 301 549:2021, IDT) specification requires that authoring tools “enable and guide” the production of accessible web content @canasc.

Section 11.8.5 of CAN/ASC - EN 301 549:2024 Accessibility requirements for ICT products and services (EN 301 549:2021, IDT) specification requires that tools which provide templates provide accessible templates @canasc.

=== Principle B.3. Authors are supported in improving the accessibility of existing content

Beyond authoring code Generative AI tools can be instructed to remediate existing code. Research has found that instructing a well-trained Generative AI model of the necessary remediations required with instruction based on WCAG principle can fix issues. However, as of yet it isn’t 100% capable which may be related to complexities of the accessibility issues, understanding of the code to remediate, effectiveness of the prompts, and/or training @aljedaani_does_2024. While Generative AI may not be able to handle complex remediation, it could be used to handle more routine accessibility issues. Thereby, freeing up time for the authors to focus on the more complex issues manually @suh_human_nodate.

Section 11.8.4 of CAN/ASC - EN 301 549:2024 Accessibility requirements for ICT products and services (EN 301 549:2021, IDT) specification requires that the accessibility checking functionality of tools that can detect when accessibility requirements are not met, to also provide suggestions on how to fix them. They could also automate the fixing process where applicable @canasc.

=== Principle B.4. Authoring tools promote and integrate their accessibility features

For Generative AI-based authoring tools/environments, users may have varying degrees of experience and may come from different backgrounds (e.g. developer vs designer). The tools need to support interaction patterns with the user, providing real time accessibility feedback and guidance through complex accessibility/design decisions @gurita_understanding_2025. The tools should also be able to transparently explain its reasoning behind choices @gurita_breaking_2025. In addition to informing the user about potential requirements that are being followed, they should encourage the user to reflect on the impact of modifications/refinement.

== Other thoughts/questions

- Is generating markup/code from a Generative AI prompt a transformation? Or maybe at what point would it be so?
- Does using Generative AI invert the paradigm of ATAG where the human author now takes on the responsibility of guiding about and ensuring accessible content is generated?
- Example of Agentic AI: using a browser’s MCP server to render, operate, debug, test and etc content in a real browser. (see: #link("https://webkit.org/blog/18136/introducing-the-safari-mcp-server-for-web-developers/")[Introducing the Safari MCP server for web developers], #link("https://developer.chrome.com/blog/chrome-devtools-mcp")[Chrome DevTools (MCP) for your AI agent], #link("https://github.com/mozilla/firefox-devtools-mcp")[firefox-devtools-mcp]).
- It seems that often when Generative AI output is evaluated for accessibility, there are only a few things considered; such as: labels, contrast, and alt-text. Is it that these are just easier to write automate tests for? Additionally, it often seems that only small examples or even individual interface components are evaluated. What about things like consistency across pages?
- If AI chatbots continue to increase in use, will there be a shift from authoring content directly for humans to instead being repositories of data for the chatbot to interact with on the user’s behalf? If that happens will UIs be created based on user requests to present the data (i.e. bespoke UIs)? How will it know how to best present the data to the user if there are few/no exemplars left to learn from?
- Authored content tends to be evaluated on a limited number of paths and input/interaction modalities; often those familiar to the author. Rather than an AI tool performing audits as they are now, perhaps it could allow an author to examine their output through different paths and modalities than they normally would explore. Additionally providing a mechanism for agentically controlling ATs so that the author/evaluator can assess the output through those perspectives.
- It seems that Generative AI authoring produces the best results when prompted and guided by an expert. However, it would seem that the largest benefit would be to allow novices to produce high quality accessible outputs. How are these rationalized? And going forward if novices do not learn to become experts, will quality diminish overtime as experts leave the field?
- In thinking about Generative AI we must also consider the data (or lack there of) that they were trained on. Additionally, there are a host of other decisions that have gone into making and evaluating these tools and an assessment of how those were determined should be evaluated @doush_evaluating_2025. For example, as new models emerge how are they evaluated to determine that they are improvements over previous models? What metrics are used to determine “intelligence” and etc?
- There doesn’t seem to be much discussion about a way to provide feedback to the Generative AI about good/bad generated content. An integrated system might help with reinforcement learning for the model, even if that’s just fine-tuning the model locally for the specific author. It may be that Generative AI models have this built in based on feedback in follow up prompts. However, even with this feedback system, if most developers are not aware of accessibility concerns, they may be reinforcing the model to produce inaccessible content.
- It’s starting to feel like Generative AI needs its own guidelines, similar to the distinction between ATAG and WCAG. It seems the issue may ultimately stem from the way the Generative AI model was trained, how it was fine-tuned, and etc.
- If Generative AI output is evaluated based on adherence to specs like WCAG, will it reinforce the checklist mentality instead of thinking of WCAG and ATAG as baselines?
- It seems that as Generative AI sessions grow longer, the models are more likely to stray from their guardrails, and likely foundation prompts. This may suggest a preference to using shorter sessions or specific Generative AI agents to generate accessible code or components. Much of the research seemed focused on shorter interactions and didn’t much explore the larger complexities of details planning and implementation sessions.

= Conclusion

#bibliography("bibliography.yml", style: "apa")
