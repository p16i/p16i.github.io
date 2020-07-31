---
path: "/blog/2020-relu-softplus"
date: "2020-07-28"
title: "ReLU and Softplus Activations"
---

ReLU is one of the commonly used activations for artificial neural networks, and softplus can viewed as its smooth version.
$$
\text{ReLU}(x) = \max(0, x) \ \ \ \ \ \ \ \ \ \ \ \text{softplus}_\beta(x) = \frac{1}{\beta}\log(1 +  e^{\beta x}),
$$
where $\beta$ is a parameter that one can specify; it is typically set to one. The figure illustrates how soffplus becomes closer to ReLU when using different $\beta$ values.

<div align="center">
  <img width="300px" src="/images/blog/2020-softplus-relu.png"/>
</div>

[Dombrowski et al. (2019)][1]'s Theorem 2 says that for one-layer neuron network with ReLU activations $g(x) = \max(0, w^Tx)$ and and its softplus version $g_\beta(x) = \text{softplus}_\beta(w^Tx)$, the following equality holds:
$$
\mathbb{E}_{\epsilon \sim p_\beta}[\nabla g(x - \epsilon)] = \nabla g_{\beta/\|w\|} (x).
$$
The gradient wrt. to the input of the softplus network is the expectation of the gradient of the ReLU network when the input is perturbed by the noise $\epsilon$.

In the following,  I state the proof that is provided in [the supplement of the paper][sup].

Let assume for a moment that $x$ is scalar. We first start by showing that
$
\mathbb{E}_{\epsilon \sim p_\beta} [ g(x-\epsilon) ] = \text{softplus}_\beta(x)
$. To do this, we write 
$$
\text{softplus}_\beta(x) = \int_{-\infty}^{\infty} p(\epsilon) g(x-\epsilon) \text{d}\epsilon \tag{1},
$$
where $p(\epsilon)$ is implicitly defined. Differentiating the equation both, we get

$$
\begin{aligned}
\sigma_\beta(x) &= \int_{-\infty}^{\infty} p(\epsilon) \mathbb 1_{[x-\epsilon > 0]} \text{d}\epsilon \\ 
&= \int_{-\infty}^{x} p(\epsilon)  \text{d}\epsilon.
\end{aligned}
$$
Applying another differentiaion yields
$$
 \underbrace{\frac{\beta}{(e^{\beta \epsilon /2} + e^{-\beta \epsilon / 2})^2}}_{\triangleq p_\beta(x)} = p(x).
$$
Substituting $p_\beta$ in (1), we get
$$
\begin{aligned}
\text{softplus}_\beta(x) &= \int_{-\infty}^{\infty} p_\beta(\epsilon) g(x-\epsilon) \text{d}\epsilon \\
&= \mathbb{E}_{\epsilon \sim p_\beta} [ g(x-\epsilon)]. \tag{2}
\end{aligned}
$$

Consider $\mathbf x, \mathbf \epsilon \in \Reals^d$. We assume that $p_\beta(\mathbf \epsilon) = \prod_{i=1}^d p_{\beta}(\epsilon_i)$; that is the noise vector $\mathbf \epsilon$ consists of $d$ independent noise components. Furthermore, we choose
$$
\mathbf \epsilon = \epsilon_p \hat{\mathbf w} + \sum_{i=1}^d \epsilon_0^{(i)} \hat{\mathbf{w}_0}^{(i)},
$$
s.t. $\forall i \in [d], \hat{\mathbf w}^T \hat{\mathbf{w}_0}^{(i)} = 0$  and $\mathbf w =  \| \mathbf w \| \hat{\mathbf{w}}$. Then, from (2), it follows that 
$$
\begin{aligned}
\mathbb{E}_{\epsilon \sim p_\beta} [ g(\mathbf x- \mathbf \epsilon)] &=  \mathbb{E}_{\epsilon \sim p_\beta} [ \text{ReLU}(\mathbf w^T(\mathbf x- \mathbf \epsilon))] \\
&= \mathbb{E}_{\epsilon \sim p_\beta} [ \text{ReLU}(\mathbf w^T\mathbf x- \mathbf w^T \mathbf \epsilon)]  \\
&= \mathbb{E}_{\epsilon \sim p_\beta} [ \text{ReLU}(\mathbf w^T\mathbf x- \epsilon_p \| \mathbf w \|)].
\end{aligned} 
$$
Consider $\tilde{\mathbf \epsilon} \triangleq \mathbf \epsilon_p \| \mathbf w \|$. The expectation can be rewritten as 
$$
\begin{aligned}
\mathbb{E}_{\epsilon \sim p_\beta} &[ \text{ReLU}(\mathbf w^T\mathbf x- \epsilon_p \| \mathbf w \|)] = \int_{-\infty}^{\infty} p_\beta(\mathbf \epsilon) \text{ReLU}(\mathbf w^T\mathbf x- \epsilon_p \| \mathbf w \|) \text{d} \mathbf \epsilon \\
&= \int_{-\infty}^{\infty} \underbrace{p_\beta\bigg(\frac{\tilde{\mathbf \epsilon}}{\| \mathbf w \|}\bigg) \bigg( \frac{1}{\| \mathbf w \|} \bigg)}_{p_\frac{\beta}{\|\mathbf w\|}(\tilde{\mathbf \epsilon)}} \text{ReLU}(\mathbf w^T\mathbf x- \tilde\mathbf{\epsilon}) \text{d} \tilde {\mathbf \epsilon} \\
&= \mathbb E_{\tilde{\mathbf \epsilon} \sim p_{\frac{\beta}{\| \mathbf w \|}}} [ \text{ReLU}(\mathbf w^T\mathbf x- \tilde\mathbf{\epsilon})] \\
&= \text{softplus}_{\frac{\beta}{\| \mathbf w \|}}(x).
\end{aligned}
$$

Differentiating both sides yields the desired result. ◼️

## Why does this result matter?

In the paper, Dombrowski et al. (2019) show that attribution (explanation) maps can be arbitrarily manipulated. They argue that this is because the output manifold of the ReLU neural network has a large curvature, and it causes gradients wrt. to the input to be highly unstable when the input is slightly perturbed.


They show that one can prevent such manipulations by replacing ReLU with the softplus activation. Based on the theorem 2, they argue and empirically show that doing so has the same effect (attribution maps) as SmoothGrad, in which the attribution map is averaged from several maps of the input perturbed by some noise.

## Reference
[Dombrowski et al. (2019) "Explanations can be manipulated and geometry is to blame"][1]

## Appendix
### From Softplus to Sigmoid
Consider $\text{Softplus}_1(x) = \log(1+\exp(x))$. The derivative is

$$
\begin{aligned}
\frac{\text{d}}{\text{d}x} \text{Softplus}_1(x) = \underbrace{\frac{1}{1+\exp(x)}\exp(x)}_{\text{Sigmoid}(x)}.
\end{aligned}
$$

[1]: http://papers.nips.cc/paper/9511-explanations-can-be-manipulated-and-geometry-is-to-blame
[sup]: http://papers.nips.cc/paper/9511-explanations-can-be-manipulated-and-geometry-is-to-blame-supplemental.zip