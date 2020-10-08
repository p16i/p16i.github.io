---
path: "/blog/2020-what-and-why-interpretability"
date: "2020-10-08"
title: "What and Why is Interpretability Necessary?"
---
With an increase adoption of machine models in real world, making these model safe is inevitable. Apart from robustness agains adversarial examples, interpretability is another important aspect that invites a lot discussions ranging from philosophy to technical details.

This blog post summarizes two positioning papers on interpretability that I find relevant to the research of machine learning interpretability. To me, these papers invite the reader to think about what important and necessary for interpretability research to be fruitful and rigor.  

## Towards A Rigorous Science of Interpretable Machine Learning, Doshi-Velez and Kim (2017)

The main contribution of this paper is to discuss when interpretability is necessary and portray the levels of evaluation that concern interpretability research.

Kim argues that not all situation that interpretability is necessary: for example, we do not need explanations for advertisement recommendations or decisions provided by the algorithm has no negative consequences.  They further argue that the presence of incompleteness make interpretability important; such incompleteness aspects include incomplete scientific understanding, mismatched objectives, safety, ethics (fairness and discrimination), and multi-objective trade-offs (predictive performance and privacy).

One particular issue of interpretability research is how to evaluate the important of technique proposes as we do have the ground truth to objectively compare.  Kim purposes there levels are application-grounded, human-grounded, and functional-grounded evaluations; one can see these evaluations are ordered by the involvement degree of humans.

<div>
    <img src="https://i.imgur.com/0OkA2O8.png">
    <div style="color: gray">Fig 1: Taxonomy of evaluation approaches for interpretability (image courtesy Doshi-Velez and Kim (2017))</div>
    <br/>
</div>

**Application-grounded** evaluation is meant to evaluate interpretability research such as new methods based on real tasks with real humans interaction. Although such a evaluation allows researchers to estimate their interpretability method with little bias, it is typically infeasible due to time and resources constraints.

Having said that, one might resort to **human-grounded** where humans still involve in evaluating the results, but simpler tasks are used. Such tasks could be binary choice selection (which explanation is better?), forward simulation (given input and explanation, what should be the output of the model?), and counterfactual simulation (given input and explanation or output, how to adjust the output to get a certain outcome)

**Functional-grounded** evaluation is the last type of evaluation that one could do. Here, one uses a proxy task to study his/her research. Although this kind of evaluation can be easily conducted, it should be applied once we are already sure that the model is reliable (e.g. via with human-grounded evaluation).

## Mythos of Model Interpretability, Lipton (2018)

Lipton (2018) points out that interpretability has no universal definition: researchers often miss to discuss what is interpretability and why it is necessary. In fact,  the term might actually contain several distinct aspects that one can look at. Interesting questions asked and set the flow of the paper include:

- Q1: Are human decision-markers transparent?
- Q2: What are transparency and trust?

(Q1) Despite the argument that humans can reason about their actions, it is not clear what notions of interpretability that this reasoning could fit in. Also, in a neuronal level, we do not actually know the underlying mechanism that yields such actions.

Often, interpretability refers to understandability (or intelligibility): given all we know about the model, how likely it is that we can understand the model's mechanism; under this notion, the complexity of the model hinders understandability. Hence, another direction of interpretability research is post-hoc approaches that one can apply to get explanations for the output of the trained model: such explanations could be text or saliency maps.

### Desiderata of Interpretability Research

Lipton (2018) discusses that there are five desiderata of interpretability research: they are objectives that interpretability research aims to accomplish:

<div>
    <center>
    <img width="400px" src="https://i.imgur.com/iSnJKmC.png"/>
    </center>
    <div style="color: gray">Fig 2: Lipton (2018)'s five desiderata of interpretability research</div>
    <br/>
</div>


1. **Trust** (Q2): it is the aspect often used to motivate why interpretability is necessary; one interesting case that Zach rises is that we are not only interested in in the accuracy of the model but also when or which samples it predicts correctly. 
2. **Causality**: supervised learning learns associations in observational data; hence, claims about casual relationships  could not be or must be discussed carefully. To make such claims, some assumptions  are typically required and must be explicitly discerned.
- **Transferability**:  it has been known the i.i.d assumption is typically violated in reality, e.g. training and test distributions are different. When such situations happen, the algorithm would lack of robustness: in the extreme case, this robustness is the essence of adversarial attack.
- **Informativeness**: often, the real objective of ML systems is to provide information to the user (e.g. via its output). This single output might be sufficient but not in all situations; sometimes, humans need more informations to make a critical decision.
- **Fair and Ethical Decision-Making**: interpretability research might lend a hand for evaluating whether algorithmic decision-making is fair; this is crucial today because we rely or interact with many algorithms in our daily life. GDPR's right to explanation is an example of controlling this aspect of algorithmic influence. Lipton (2018) further suggests that algorithm decision should be contestable: being able to falsify and providing ways for the user to adjust the decision to match the desired output.

# Acknowledgment

Thanks Bojana Grujičić for helping clarify some of the definitions in Lipton (2018).