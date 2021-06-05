---
path: "/blog/2021-activation-maximization"
date: "2021-06-02"
title: "Activation Maximization"
---

## Formulation

Denote $\mathbf x \in \mathcal X := \reals^d$  a sample and consider  a DNN $f: \mathcal X \rightarrow \reals^K$where $K \in \mathbb N$ is the number of classes. The logit (value before applying softmax) of the $k$-th class is

$$
\begin{aligned}
f_k(\mathbf x; \theta) := [f(\mathbf x; \theta )]_k,
\end{aligned}
$$

where we explicitly write $\theta$  as the parameters of $f$. 

The goal of activation maximization for the $k$-th class is to 

$$
\begin{aligned}
\mathbf x^* \leftarrow \argmax_{\mathbf x \in \mathcal X}  f_k (\mathbf x ; \theta).
\end{aligned}
$$

Recall that  $f_k(\mathbf x; \theta) \in \reals$, the optimization problem above is not well-defined because we can always find $\mathbf x$  that makes $f_k(\cdot)$ larger. To illustrate, we  consider 

$$
\begin{aligned}
f_\text{linear}(\mathbf x; \theta) = \mathbf x^T\mathbf w + b,
\end{aligned}
$$

where $\theta = \{ \mathbf w \in \reals^d, b \in \reals \}$ . Here, we can clearly see that making $\mathbf x$  larger  directly increases the value $f_\text{linear}(\mathbf x; \theta)$. 

To make the objective problem well defined, we employ regularization $\Omega(\mathbf x)$, which allows us to specify how suitable solution  of the objective problem looks like.  For example, one natural choice is the $l_2$  regularizer

$$
\begin{aligned}
\Omega_{l_2}(\mathbf x) = - \lambda \| \mathbf x \|^2_2,
\end{aligned}
$$

which prefers the solution with smallest $l_2$ norm. The activation maximization (in literature also known as feature visualization) becomes

$$
\begin{aligned}
\mathbf x^* \leftarrow \argmax_{\mathbf x \in \mathcal X}  \underbrace{f_k (\mathbf x ; \theta) + \Omega(\mathbf x)}_{=:\mathcal L (\mathbf x; \Omega_\lambda )}.
\end{aligned}
$$

For the case of $\mathcal X = \reals$ and $\Omega = \Omega_{l_2}$, the objective function becomes concave due to the convexity of  $\Omega_{l_2, \lambda} =  -\lambda x^2$.    

<div align="center">
  <img src="https://i.imgur.com/75eSFNT.png"/>
  <div style="color: gray">Fig. 1: Components the Loss for Example 1.</div>
  <br/>
</div>

Because of concavity, we now have a close-form solution for $f_\text{linear}$:

$$
\begin{aligned}
\nabla_\mathbf x \mathcal L(\mathbf x; \Omega_{l_2, \lambda}) = \mathbf w - 2\lambda \mathbf x \implies \mathbf x^* = \frac{\mathbf w}{2\lambda}.
\end{aligned}
$$

**Example 2:**

Let $\mathcal X \in \reals^2$  and denote $\mathbf x = (x_1, x_2)$.  Consider $f(\mathbf x ) = \max(x_1, x_2)$ and $\Omega_{l_2,\lambda}$. The objective function is

$$
\begin{aligned}
\mathcal L(\mathbf x ; \Omega_{l_2, \lambda}) = \max(x_1, x_2) - \lambda \| \mathbf x \|_2^2.
\end{aligned}
$$

One observes that $\lambda \| \mathbf x \|_2^2$ is the circle (or hyper-spherical in higher dimensions) constraint. Let's assume $\lambda = 1$. We observe that in this case, we have two possible solutions, which is where the level curve of the regularizer touches the level curve at $f(\mathbf x )   = 3$.

<div align="center">
  <img src="https://i.imgur.com/5PPxkib.png"/>
  <div style="color: gray">Fig. 2: Components of the Loss for Example 2; dashed lines are level curves of the regularizer.</div>
  <br/>
</div>


In practice, from my experience, it is quite difficult to get visually understandable samples from the process, and it seems that a wide of regularization that one can employ. For the image domain, [Olah et al. (distill.pub, 2017)](https://distill.pub/2017/feature-visualization/) provides an overview on this regularization spectrum.

## Probabilistic Interpretation

Denote $\omega_k$  be the index of the $k$-th class for $k = \{1, \dots, K\}.$  Instead of taking $f_k(\mathbf x)$ being the logit value, we could take it to be 

$$
\begin{aligned}
f_k(\mathbf x) := \log \mathbb{P}(\omega_k  | \mathbf x).
\end{aligned}
$$

Let $\Omega(\mathbf x) = \log \mathbb{P} (\mathbf x)$.  Recall Bayes' rule

$$
\begin{aligned}
\mathbb P (\omega_k | \mathbf x) \mathbb P (\mathbf x) = \mathbb P (\mathbf x | \omega_k) \mathbb P(\omega_k).
\end{aligned}
$$

Hence, in this setting, the objective of activation can be rewritten as  

$$
\begin{aligned}
\mathcal L(\mathbf x) &= f_k(\mathbf x) + \Omega (\mathbf x)  \\

&= \log \mathbb P (\omega_k | \mathbf x) + \log \mathbb P(\mathbf x) \\ 

&= \log \mathbb P (\mathbf x | \omega_k)  + \log \mathbb P(\omega_k).

\end{aligned}
$$

We can see here that the marginal distribution of the class does not depend on $\mathbf x$, hence no influence on the solution of $\max_{\mathbf x } \mathcal L(\mathbf x)$. Therefore, we can view activation maximization to find a  prototypical sample for the given class $\omega_k$, while maximizing only $f_k(\mathbf x)$  is to find the sample that   the model is the most certain for the class $\omega_k$

### Implicit Density Models Perspective

Finer interpretation on activation maximization can be through the view of implicit generative  models learned by discriminate models. In particular, [Srinivas and Fleuret (ICLR, 2021)](https://openreview.net/pdf/b29e31cf78e011a59f9e49950670211d4c516b00.pdf) proposes to consider the joint distribution between $\omega_k$   and $\mathbf x$

$$
\begin{aligned}
\mathbb{P}(\omega_k , \mathbf x) := \frac{\exp(f_k(\mathbf x; \theta))}{Z(\theta)},
\end{aligned}
$$

where $Z(\theta)$ is the normalization constant. In the following, we will also write $f_k(\mathbf x) := f_k(\mathbf x; \theta)$ to reduce notation cluttering. First, we observe that

$$
\begin{aligned}
\mathbb{P}(\mathbf x) = \frac{1}{Z(\theta)} \sum_{k'} \exp(f_{k'}(\mathbf x)).
\end{aligned}
$$

Secondly, we know that 

$$
\begin{aligned}
\mathbb{P}(\omega_k | \mathbf x) &= 
\frac{1}{\mathbb{P}(\mathbf x)} \mathbb{P}(\omega_k, \mathbf x)\\

&= \bigg[ \frac{\cancel{Z(\theta)}}{\sum_{k'} \exp(f_{k'}(\mathbf x))} \bigg] \bigg[ \frac{\exp(f_k(\mathbf x) )}{\cancel{Z(\theta)}} \bigg ]   \\

&=: \text{Softmax}(f(\mathbf x)).

\end{aligned}
$$

Consider the conditional distribution of the sample given $\omega_k$

$$
\begin{aligned}
\mathbb{P}(\mathbf x |\omega_k )  = \frac{\mathbb{P}(\omega_k, \mathbf x)}{\mathbb{P}(\omega_k)}.
\end{aligned}
$$

Taking the logarithm yields

$$
\begin{aligned}
\log \mathbb P(\mathbf x | \omega_k) = f_k(\mathbf x) - \log Z(\theta) - \log \mathbb{P}(\omega_k).
\end{aligned}
$$

Because the second and third terms do not depend on $\mathbf x$, maximizing $f_k(\mathbf x)$  is thus equivalent to maximizing $\log \mathbb{P}(\mathbf x |\omega_k)$.

## Connection to Adversarial Robustness

It has been observed that preforming activation maximization on adversarially robust models produce images that are more visually plausible that standard models.  Some of recent works on this direction include (in chronological order)

- [Ross and Doshi-Velez (AAAI, 2018), "Improving the Adversarial Robustness and Interpretability of Deep Neural Networks by Regularizing Their Input Gradients"](https://ojs.aaai.org/index.php/AAAI/article/view/11504)
- [Etmann and Lunz et al. (ICML, 2019), "On the Connection Between Adversarial Robustness and Saliency Map Interpretability"](https://arxiv.org/pdf/1905.04172.pdf)
- [Wang et al. (Openreview, 2019) Smooth Kernels Improve Adversarial Robustness and Perceptually-Aligned Gradients](https://openreview.net/pdf?id=BJerUCEtPB)
- [Boopathy et al. (ICML, 2020), "Proper Network Interpretability Helps Adversarial Robustness in Classification"](http://proceedings.mlr.press/v119/boopathy20a/boopathy20a.pdf)
- [Mangla et al. (ECML/PKDD, 2020), "On Saliency Maps and Adversarial Robustness"](https://doi.org/10.1007/978-3-030-67661-2_17)

This phenomena is an interesting connection between adversarial robustness and model interpretability.

[Srinivas and Fleuret (ICLR, 2021)](https://openreview.net/pdf/b29e31cf78e011a59f9e49950670211d4c516b00.pdf) study this exact question via the view of implicit  density models that has just mentioned. More precisely, one of their key results is that  when making the implicit density of DNNs  more aligned (via score matching [[Hyvärinen (JMLR, 2005)]](https://www.jmlr.org/papers/volume6/hyvarinen05a/hyvarinen05a.pdf)) improves the structure of gradient-based explanations. 

<div align="center">
  <img src="https://i.imgur.com/hns4d2I.png"/>
  <div style="color: gray">
    Figure Taken From Srinivas and Fleuret (2021). 
  </div>
  <br/>
</div>

## Conclusions

Activation maximization is a tool that one can use to study what features DNNs learn. Recent works have observed interesting properties from synthetic images from the framework, and the connection between these properties and adversarial robustness seem prominent. However, despite such positive results, a recent human study [[Borowski and Zimmermann et al. (ICLR, 2021)]](https://arxiv.org/pdf/2010.12606.pdf) shows that these synthetic images might not be that helpful for humans to understand models comparing those exemplar images.

This article is my recollection of [Grégoire Montavon](https://www.ml.tu-berlin.de/menue/members/gregoire_montavon)'s ML 1 (WS2021), Lecture XAI, at TU Berlin.

The first two figures are made in [Google Colab](https://colab.research.google.com/drive/15RkMdxwxigHJSOK0l8_CaM4XfBplaJIO).
